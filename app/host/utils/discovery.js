'use strict';

const myLocalIpIs = require('my-local-ip-is');
const options = require('../options');
const pTimeout = require('p-timeout');
const {shell} = require('utils-mad');

module.exports = async () => {
    const deviceObject = {};

    const ips = myLocalIpIs();
    console.log(`current ip\n${options.addIndent(ips.map(elem => Object.values(elem).join(': ')))}`);

    for (const {ip} of ips) {
        const cidr = `${ip.split('.').slice(0, -1).join('.')}.0/24`;
        const nmap = await pTimeout(shell.run(options.nmapPing(cidr)), options.nmapTimeoutPing);

        for (const elem of nmap.split(options.nmapNewLine)) {
            const matched = elem.match(options.nmapIp);

            if (matched) {
                deviceObject[matched[1]] = {};
            }
        }
    }

    return deviceObject;
};
