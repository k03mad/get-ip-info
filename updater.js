'use strict';

const pkg = require('./package.json');
const updateNotifier = require('update-notifier');

updateNotifier({pkg}).notify();
