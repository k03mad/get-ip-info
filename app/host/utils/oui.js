'use strict';

const oui = require('oui');

/**
 * @param {object} deviceObject
 * @returns {object}
 */
module.exports = deviceObject => Object.fromEntries(
    Object.entries(deviceObject).map(elem => {
        if (elem[1].mac) {
            const ouiData = oui(elem[1].mac);

            if (ouiData) {
                // eslint-disable-next-line no-unused-vars
                const [vendor, street, city, country] = oui(elem[1].mac).split('\n');
                elem[1].oui = `${vendor} (${country})`;
            }
        }

        return elem;
    }),
);
