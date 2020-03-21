#!/usr/bin/env node

'use strict';

const convert = require('xml-js');
const options = require('./lib/options');
const services = require('./lib/services');
const {args, help} = require('./lib/help');
const {request, object} = require('utils-mad');

if (args.help) {
    console.log(help);
    process.exit(0);
}

(async () => {
    const errors = [];

    // filter services without query if ip not entered
    const data = args.ip
        ? services
            .filter(elem => elem.queryIp)
            .map(elem => {
                elem.request = elem.queryIp(args.ip);
                return elem;
            })
        : services.map(elem => {
            elem.request = elem.currentIp;
            return elem;
        });

    await Promise.all(data.map(async elem => {
        try {
            let {body} = await request.got(elem.request);

            // if service use xml — convert to json
            if (elem.xmlPath) {
                body = Object.fromEntries(Object
                    .entries(object.path(convert.xml2js(body, {compact: true}), elem.xmlPath))
                    // eslint-disable-next-line no-underscore-dangle
                    .map(([key, value]) => [key, value._text]),
                );
            }

            const output = [{value: options.urlColor(elem.request)}];

            for (let [key, value] of Object.entries(body)) {
                if (value) {
                    if (elem.removeKeys && elem.removeKeys.includes(key)) {
                        continue;
                    }

                    value = String(value);

                    // filter duplicated values
                    if (output.filter(
                        field => field.value.toLowerCase() === value.toLowerCase(),
                    ).length === 0) {
                        output.push({key, value});
                    }
                }
            }

            const printData = output.map(({key, value}) => {
                const valueColor = value.match(options.numbersRegExp)
                    ? options.numbersColor
                    : options.othersColor;

                if (key) {
                    return `${options.indent}${key}: ${valueColor(value)}`;
                }

                return valueColor(value);
            });

            console.log(`${printData.join('\n')}\n`);
        } catch (err) {
            errors.push(`${options.urlColor(elem.request)} ${options.errColor(err)}`);
        }
    }));

    if (errors.length > 0) {
        console.log(errors.join('\n\n'));
        process.exit(1);
    }
})();
