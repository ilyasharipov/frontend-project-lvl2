import _ from 'lodash';

const getStylishData = (ast, depth = 0) => {
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

  return `{\n${stylishData.join('\n')}\n${indent}}`;
};

const stringify = (value, depth) => {
  const indent = '    '.repeat(depth);
  if (!_.isPlainObject(value)) {
    return value;
  }

  const res = Object.entries(value);

  const complex = res.map((item) => {
    const [key, value] = item;
    const indent =  '    '.repeat(depth);

    if (_.isPlainObject(value)) {
      return `        ${key}: ${stringify(value, depth + 1)}`;
    }

    return `        ${key}: ${value}`;
  });

  return `{\n${indent}${complex.join('\n')}\n${indent}    }`;

};

export default (tree) => `${getStylishData(tree)}\n`;
