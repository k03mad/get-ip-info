'use strict';

module.exports = [
    /* eslint-disable jsdoc/require-jsdoc */

    {
        currentIp: 'https://ifconfig.me/all.json',
        removeKeys: ['remote_host', 'method'],
    },
    {
        currentIp: 'https://extreme-ip-lookup.com/json/',
        queryIp: ip => `https://extreme-ip-lookup.com/json/${ip}`,
        removeKeys: ['status', 'lat', 'lon', 'countryCode', 'ipType'],
    },
    {
        currentIp: 'https://ipinfo.io',
        queryIp: ip => `https://ipinfo.io/${ip}`,
        removeKeys: ['readme', 'loc'],
    },
    {
        currentIp: 'http://api.geoiplookup.net/',
        queryIp: ip => `http://api.geoiplookup.net/?query=${ip}`,
        removeKeys: ['latitude', 'longitude', 'countrycode'],
        xmlPath: 'ip.results.result',
    },
];
