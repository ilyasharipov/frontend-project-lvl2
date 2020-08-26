#!/usr/bin/env node
import commander from 'commander';

// const { version: version, description: description } = require('../package');
// import {name, version} from './../package.json'
import { version, description } from '../package.json';

commander
  .version(version)
  .description(description);

commander.parse();
