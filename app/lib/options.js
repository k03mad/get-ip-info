'use strict';

const {blue, cyan, yellow, red} = require('colorette');

module.exports = {
    indent: '| ',

    numbersRegExp: /^[\d ,.-]+$/i,

    numbersColor: cyan,
    othersColor: yellow,

    urlColor: blue,
    errColor: red,
};
