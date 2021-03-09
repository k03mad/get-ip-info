#!/usr/bin/env node

'use strict';

const arp = require('./host/utils/arp');
const discovery = require('./host/utils/discovery');
const options = require('./host/options');
const oui = require('./host/utils/oui');
const print = require('./host/utils/print');
const pTimeout = require('p-timeout');
const {args, help} = require('./host/cli');
const {shell} = require('@k03mad/utils');

require('../updater');

if (args.help) {
    console.log(help);
    process.exit(0);
}

(async () => {
    let devices;

    if (args.host) {
        devices = [[args.host, {}]];
    } else {
        try {
            const discoveryData = await discovery();
            const arpData = await arp(discoveryData);

            devices = Object.entries(oui(arpData))
                .sort((a, b) => a[0].split('.').pop() - b[0].split('.').pop());

        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    for (const [ip, data] of devices) {
        print.devices(ip, data);
    }

    print.separator('Start port scan');

    const devicesWithOpenPorts = [];

    for (const [ip, data] of devices) {
        print.devices(ip, data);

        try {
            const time = Date.now();

            const nmap = await pTimeout(shell.run(options.nmapLite(ip)), options.nmapTimeoutLite);
            print.elapsed(time);

            const output = [];

            for (const elem of nmap.split(options.nmapNewLine)) {
                const matched = elem.match(options.nmapPort);

                if (matched) {
                    output.push(options.addIndent(elem));
                }
            }

            if (output.length > 0) {
                console.log(output.join('\n'));
                devicesWithOpenPorts.push([ip, data]);
            } else {
                print.warning('no open ports found or check blocked');
            }

        } catch (err) {
            print.error(err);
        }
    }

    if (devicesWithOpenPorts.length > 0) {
        print.separator('Start port scan with version detection (only for devices with detected ports at previous step)');

        for (const [ip, data] of devicesWithOpenPorts) {
            print.devices(ip, data);

            try {
                const time = Date.now();

                const nmap = await pTimeout(shell.run(options.nmapFull(ip)), options.nmapTimeoutFull);
                print.elapsed(time);

                for (const elem of nmap.split(options.nmapNewLine)) {
                    console.log(options.addIndent(elem));
                }

            } catch (err) {
                print.error(err);
            }
        }
    }

})();
