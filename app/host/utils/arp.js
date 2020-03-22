'use strict';

const options = require('../options');
const {shell} = require('utils-mad');

module.exports = async deviceObject => {
    const deviceObjectClone = {...deviceObject};

    const arp = await shell.run(options.arp);

    arp.split('\n').forEach(elem => {
        const matched = elem.match(/\(((?:\d{1,3}\.){3}\d{1,3})\).+at (([\da-z]{1,2}[:-]){5}([\da-z]{1,2}))/);

        if (matched) {
            const [, ip, mac] = matched;

            if (
                !ip.endsWith('.0')
                && !ip.includes('.255')
                // multicast
                && !ip.match(/^(22[4-9]|23\d)/)
            ) {
                if (deviceObjectClone[ip]) {
                    deviceObjectClone[ip].mac = mac;
                } else {
                    deviceObjectClone[ip] = {mac};
                }
            }
        }
    });

    return deviceObjectClone;
};
