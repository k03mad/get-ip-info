'use strict';

const {blue, green, gray, magenta, red, yellow, cyan} = require('colorette');

module.exports = {
    addIndent: message => gray('⎣ ') + message,

    ipColor: blue,
    valueColor: green,
    timeColor: cyan,
    warningColor: yellow,
    errorColor: red,

    scanMessageColor: magenta,
    scanMessageSeparator: '—',

    arp: 'arp -a -n',

    nmapPing: ip => `nmap -sn -PA${[
        20 - 25, 53, 67, 68, 80, 110, 111, 119, 123,
        135, 139, 143, 161, 194, 443, 445, 853, 993,
        995, 1723, 3306, 3389, 5900, 8080,
    ].join()} ${ip}`,

    nmapTimeoutPing: 1 * 60000,

    nmapLite: ip => `nmap -Pn ${ip}`,
    nmapTimeoutLite: 2 * 60000,

    nmapFull: ip => `nmap -Pn -sV ${ip}`,
    nmapTimeoutFull: 10 * 60000,

    nmapNewLine: /[\n\r]+/,
    nmapIp: /for ((?:\d{1,3}\.){3}\d{1,3})/,
    nmapPort: /(^\d+\/\S+)|^Service Info:/,

};
