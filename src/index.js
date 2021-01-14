import path from 'path';
import getDiff from './astBuilder.js';
import parser from './parsers.js';
import getPlainOutput from './formatters/formatter.js';

export default (beforeFile, afterFile, format = 'stylish') => {
  const formatBeforeFile = path.extname(beforeFile);
  const formatAfterFile = path.extname(afterFile);

  const obj1 = parser(beforeFile, formatBeforeFile);
  const obj2 = parser(afterFile, formatAfterFile);

  const diff = getDiff(obj1, obj2);
  return getPlainOutput(diff, format);
};
