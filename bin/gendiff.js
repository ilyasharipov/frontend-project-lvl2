#!/usr/bin/env node
import { createRequire } from 'module';
import commander from 'commander';
import genDiff from '../src/index.js';

const require = createRequire(import.meta.url);

const { version, description } = require('../package');

commander
  .version(version)
  .description(description)
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2));

commander.parse(process.argv);
