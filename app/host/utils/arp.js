'use strict';

const {shell} = require('utils-mad');

module.exports = async ({deviceObject, cidr}) => {
    const deviceObjectClone = {...deviceObject};

    const arp = await shell.run('arp -a -n');

    arp.split('\n').forEach(elem => {
        const matched = elem.match(/\(((?:\d{1,3}\.){3}\d{1,3})\).+at (([\da-z]{1,2}[:-]){5}([\da-z]{1,2}))/);

        if (matched) {
            const [, ip, mac] = matched;

            if (
                ip.startsWith(cidr.split('.').slice(0, -1).join('.'))
                && !ip.endsWith('.0')
                && !ip.endsWith('.255')
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
