import _ from 'lodash';

export default (obj1, obj2) => {
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
