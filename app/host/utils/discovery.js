'use strict';

const internalIp = require('internal-ip');
const options = require('../options');
const pTimeout = require('p-timeout');
const {shell} = require('utils-mad');

module.exports = async () => {
    const deviceObject = {};

    const ip = await internalIp.v4();
    const cidr = `${ip.split('.').slice(0, -1).join('.')}.0/24`;

    const nmap = await pTimeout(shell.run(options.nmapPing(cidr)), options.nmapTimeoutPing);

    for (const elem of nmap.split(options.nmapNewLine)) {
        const matched = elem.match(options.nmapIp);

        if (matched) {
            deviceObject[matched[1]] = {};
        }
    }

    return {deviceObject, cidr};
};
