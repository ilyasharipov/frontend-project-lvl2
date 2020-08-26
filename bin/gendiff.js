#!/usr/bin/env node
import { createRequire } from 'module';
import commander from 'commander';

const require = createRequire(import.meta.url);

const { version, description } = require('../package');

commander
    .version(version)
    .description(description);

commander.parse()
