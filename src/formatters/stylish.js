import _ from 'lodash';

const stringify = (object, depth) => {
  const indent = '    '.repeat(depth);
  if (!_.isPlainObject(object)) {
    return object;
  }

  const packedStrings = Object.entries(object).map((item) => {
    const [key, value] = item;

    if (_.isPlainObject(value)) {
      return `        ${key}: ${stringify(value, depth + 1)}`;
    }

    return `        ${key}: ${value}`;
  });

  return `{\n${indent}${packedStrings.join('\n')}\n${indent}    }`;
};

const getStylishData = (ast, depth = 0) => {
  const str = '    ';
  const indent = str.repeat(depth);

  const stylishData = ast.reduce((acc, node) => {
    const {
      type, key, afterValue, beforeValue, children,
    } = node;

    switch (type) {
      case 'added':
        acc.push(`${indent}  + ${key}: ${stringify(afterValue, depth)}`);
        break;
      case 'deleted':
        acc.push(`${indent}  - ${key}: ${stringify(beforeValue, depth)}`);
        break;
      case 'changed':
        acc.push([`${indent}  - ${key}: ${stringify(beforeValue, depth)}`]);
        acc.push([`${indent}  + ${key}: ${stringify(afterValue, depth)}`]);
        break;
      case 'unchanged':
        acc.push(`${indent}    ${key}: ${stringify(beforeValue, depth)}`);
        break;
      case 'nested':
        acc.push(`${indent}    ${key}: ${getStylishData(children, depth + 1)}`);
        break;
      default:
        throw new Error(`Unknown type: ${type}`);
    }

    return acc;
  }, []);

  return `{\n${stylishData.join('\n')}\n${indent}}`;
};

export default (tree) => `${getStylishData(tree)}\n`;
