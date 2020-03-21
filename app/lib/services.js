'use strict';

module.exports = [
    {
        currentIp: 'https://ifconfig.me/all.json',
    },
    {
        currentIp: 'https://extreme-ip-lookup.com/json/',
        queryIp: ip => `https://extreme-ip-lookup.com/json/${ip}`,
        removeKeys: ['status'],
    },
    {
        currentIp: 'https://ipinfo.io',
        queryIp: ip => `https://ipinfo.io/${ip}`,
        removeKeys: ['readme'],
    },
    {
        currentIp: 'http://api.geoiplookup.net/',
        queryIp: ip => `http://api.geoiplookup.net/?query=${ip}`,
        xmlPath: 'ip.results.result',
    },
];
