import _ from 'lodash';
import path from 'path';
import parser from './parsers.js';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys((obj2))).sort();

  const diff = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc.push(`  + ${key}: ${obj2[key]}\n`);
    } else if (!_.has(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}\n`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  - ${key}: ${obj1[key]}\n`);
      acc.push(`  + ${key}: ${obj2[key]}\n`);
    } else if (obj1[key] === obj2[key]) {
      acc.push(`    ${key}: ${obj2[key]}\n`);
    }

    return acc;
  }, []);

  return `{\n${diff.join('')}}\n`;
};

export default (beforeFile, afterFile, format) => {
  const formatBeforeFile = path.extname(beforeFile);
  const formatAfterFile = path.extname(afterFile);
  console.log(format);
  const obj1 = parser(beforeFile, formatBeforeFile);
  const obj2 = parser(afterFile, formatAfterFile);

  return getDiff(obj1, obj2);
};
