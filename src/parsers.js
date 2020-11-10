import yaml from 'js-yaml';
import ini from 'ini';
import { readFile } from './utils.js';

import _ from 'lodash';

const iniParser = (content) => {
  const data = ini.parse(content);

  const iter = (node) => Object.entries(node).reduce((acc, [key, value]) => {
    if (_.isObjectLike(value)) {
      return { ...acc, [key]: iter(value) };
    }
    if (typeof (value) === 'boolean') {
      return { ...acc, [key]: value };
    }
    if (!Number.isNaN(Number(value))) {
      return { ...acc, [key]: value !== null && value !== '' ? Number(value) : value };
    }
    return { ...acc, [key]: value };
  }, {});

  return iter(data);
};

export default (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(readFile(data));
    case '.yaml':
      return yaml.safeLoad(readFile(data));
    case '.yml':
      return yaml.safeLoad(readFile(data));
    case '.ini':
      return iniParser(readFile(data)); //ini.parse(readFile(data));
    default:
      throw new Error(`Unknown data format: ${format}`);
  }
};
