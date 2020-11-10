import getStylishOutput from './stylish.js';
import getPlainOutput from './plain.js';

const getFormatOutput = (tree, format) => {
  switch (format) {
    case 'stylish':
      return getStylishOutput(tree);
    case 'plain':
      return getPlainOutput(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatOutput;
