'use strict';

const options = require('../options');
const {shell} = require('@k03mad/utils');

/**
 * @param {object} deviceObject
 * @returns {object}
 */
module.exports = async deviceObject => {
    const deviceObjectClone = {...deviceObject};
    let arp;

    try {
        arp = await shell.run(options.arp);
    } catch (err) {
        if (/permission/i.test(err)) {
            arp = await shell.run(`sudo ${options.arp}`);
        } else {
            throw err;
        }

    }

    arp.split('\n').forEach(elem => {
        const matched = elem.match(/\(((?:\d{1,3}\.){3}\d{1,3})\).+at (([\da-z]{1,2}[:-]){5}([\da-z]{1,2}))/);

        if (matched) {
            const [, ip, mac] = matched;

            if (
                !ip.endsWith('.0')
                && !ip.includes('.255')
                // multicast
                && !/^(22[4-9]|23\d)/.test(ip)
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
