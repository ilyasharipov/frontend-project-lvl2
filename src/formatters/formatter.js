import getStylishOutput from './stylish.js';
import getPlainOutput from './plain.js';
import getJsonOutput from './json.js';

const getFormatOutput = (tree, format) => {
  switch (format) {
    case 'stylish':
      return getStylishOutput(tree);
    case 'plain':
      return getPlainOutput(tree);
    case 'json':
      return getJsonOutput(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatOutput;
