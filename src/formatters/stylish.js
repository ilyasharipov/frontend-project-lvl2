import _ from 'lodash';

const getStylishData = (ast, depth = 0) => {
  // console.log(JSON.stringify(ast), '\n');
  const str = '    ';
  const indent = str.repeat(depth);

  const stylishData = ast.reduce((acc, node) => {
    switch (node['type']) {
      case 'added':
        acc.push(`${indent}  + ${node['key']}: ${stringify(node['afterValue'], depth)}`);
        break;
      case 'deleted':
        acc.push(`${indent}  - ${node['key']}: ${stringify(node['beforeValue'], depth)}`);
        break;
      case 'changed':
        acc.push([`${indent}  - ${node['key']}: ${stringify(node['beforeValue'], depth)}`]);
        acc.push([`${indent}  + ${node['key']}: ${stringify(node['afterValue'], depth)}`]);
        // acc.push(indent + "  - " + node['key'] + ": " + objectToStr(node["beforeValue"], depth) + "\n" + indent + "  + " + node["key"] + ": " + objectToStr(node["afterValue"], depth));
        break;
      case 'unchanged':
        acc.push(`${indent}    ${node['key']}: ${stringify(node['beforeValue'], depth)}`);
        break;
      case 'nested':
        acc.push(`${indent}    ${node['key']}: ${getStylishData(node['children'], depth + 1)}`);
        break;
    }

    return acc;
  }, []);
  // console.log(stylishData);
  return `{\n${stylishData.join('\n')} ${indent}\n}`;
};

const stringify = (value, depth) => {
  const indent = '    '.repeat(depth);
  if (!_.isObject(value)) {
    return value;
  }
  const keysOfObject = Object.keys(value);
  const comlexValues = keysOfObject.map((key) => `        ${key}: ${value[key]}`);
  return `{\n${indent}${comlexValues.join('')}\n${indent}    }`;
};

export default getStylishData;
