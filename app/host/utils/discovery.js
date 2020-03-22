'use strict';

const LanDiscovery = require('lan-discovery');
const range = require('cidr-range');

module.exports = async () => {
    const discovery = new LanDiscovery({timeout: 60});
    const {cidr} = await discovery.getDefaultInterface();

    return new Promise(resolve => {
        discovery.startScan({ipArrayToScan: range(cidr)});
        discovery.on(LanDiscovery.EVENT_DEVICES_INFOS, devices => {
            const deviceObject = {};

            devices.forEach(({ip, name, mac}) => {
                if (
                    !ip.endsWith('.0')
                    && !ip.endsWith('.255')
                ) {
                    deviceObject[ip] = {name, mac};
                }
            });

            resolve({deviceObject, cidr});
        });
    });
};
