'use strict';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const {gray} = require('colorette');

const args = [
    {
        description: `get host info ${gray('(default: all hosts from current lan)')}`,
        name: 'host',
        alias: 'h',
    },
    {
        description: 'print this help',
        name: 'help',
        type: Boolean,
    },
];

module.exports = {
    args: commandLineArgs(args),
    help: commandLineUsage([
        {
            header: 'Options',
            optionList: args,
        },
    ]),
};
