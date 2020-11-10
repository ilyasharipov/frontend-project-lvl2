import _ from 'lodash';

const setBraceStingValue = (value) => (!_.isString(value) ? value : `'${value}'`);
const setComplexValue = (value) => (_.isPlainObject(value) ? '[complex value]' : `${setBraceStingValue(value)}`);

const getPlainData = (ast, ancestry = '') => {
  const plainData = ast.reduce((acc, node) => {
    const {
      type, key, afterValue, beforeValue, children,
    } = node;

    const newAncestry = `${ancestry}${key}`;
    switch (type) {
      case 'added':
        acc.push(`Property '${newAncestry}' was added with value: ${setComplexValue(afterValue)}`);
        break;
      case 'deleted':
        acc.push(`Property '${newAncestry}' was removed`);
        break;
      case 'changed':
        acc.push([`Property '${newAncestry}' was updated. From ${setComplexValue(beforeValue)} to ${setComplexValue(afterValue)}`]);
        break;
      case 'nested':
        acc.push(getPlainData(children, `${newAncestry}.`));
        break;
      default:
    }

    return acc;
  }, []);

  return plainData.join('\n');
};

export default (tree) => `${getPlainData(tree)}\n`;
