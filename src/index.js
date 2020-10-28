import _ from 'lodash';

export default (beforeFile, afterFile, format = '') => {
  const obj1 = JSON.parse(beforeFile);
  const obj2 = JSON.parse(afterFile);

  const keys = _.union(Object.keys(obj1), Object.keys((obj2))).sort();

  const diff = keys.reduce((acc, key) => {

    if (!_.has(obj1, key)) {
      acc += '  + ' + key + ': ' + obj2[key] + '\n';
    } else if (!_.has(obj2, key)) {
      acc += '  - ' + key + ': ' + obj1[key] + '\n';
    } else if (obj1[key] !== obj2[key]) {
      acc += '  - ' + key + ': ' + obj1[key] + '\n';
      acc += '  + ' + key + ': ' + obj2[key] + '\n';
    } else if (obj1[key] === obj2[key]) {
      acc += '    ' + key + ': ' + obj2[key] + '\n';
    }

    return acc;
  }, '\n');

  return '{' + diff + '}\n';
};
