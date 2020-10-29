import yaml from 'js-yaml';
import { readFile } from './utils.js';

export default (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(readFile(data));
    case '.yaml':
      return yaml.safeLoad(readFile(data));
    case '.yml':
      return yaml.safeLoad(readFile(data));
    default:
      throw new Error(`Unknown data format: ${format}`);
  }
};
