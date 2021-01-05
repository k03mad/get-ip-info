'use strict';

const ms = require('ms');
const options = require('../options');

module.exports = {
    /* eslint-disable jsdoc/require-jsdoc */

    devices: (ip, data) => {
        console.log(`\n${options.ipColor(ip)}`);

        for (const [key, value] of Object.entries(data)) {
            if (value) {
                console.log(options.addIndent(`${key}: ${options.valueColor(value)}`));
            }
        }
    },

    separator: message => {
        console.log([
            '\n',
            ''.padEnd(process.stdout.columns, options.scanMessageSeparator),
            '\n',
            options.scanMessageColor(message),
        ].join(''));
    },

    elapsed: time => {
        console.log(options.addIndent(`passed: ${options.timeColor(ms(Date.now() - time))}`));
    },

    warning: warn => {
        console.log(options.addIndent(options.warningColor(warn)));
    },

    error: err => {
        console.log(options.addIndent(options.errorColor(err.message)));
    },
};
