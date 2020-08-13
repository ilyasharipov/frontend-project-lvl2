#!/usr/bin/env node

const { version: version, description: description } = require('../package');
const { Command } = require('commander');

const commander = new Command();
commander
    .version(version)
    .description(description);

commander.parse()