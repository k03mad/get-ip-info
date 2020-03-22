'use strict';

const oui = require('oui');

module.exports = deviceObject => Object.fromEntries(
    Object.entries(deviceObject).map(elem => {
        if (elem[1].mac) {
            // eslint-disable-next-line no-unused-vars
            const [vendor, street, city, country] = oui(elem[1].mac).split('\n');
            elem[1].oui = `${vendor} (${country})`;
        }

        return elem;
    }),
);
