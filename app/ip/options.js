'use strict';

const {blue, cyan, yellow, red, gray} = require('colorette');

module.exports = {
    addIndent: message => gray('⎣ ') + message,

    numbersRegExp: /^[\d ,.-]+$/i,

    numbersColor: cyan,
    othersColor: yellow,

    urlColor: blue,
    errColor: red,
};
