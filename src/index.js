import path from 'path';
import getDiff from './astBuilder';
import parser from './parsers.js';

export default (beforeFile, afterFile, format) => {
  const formatBeforeFile = path.extname(beforeFile);
  const formatAfterFile = path.extname(afterFile);
  console.log(format);
  const obj1 = parser(beforeFile, formatBeforeFile);
  const obj2 = parser(afterFile, formatAfterFile);

  return getDiff(obj1, obj2);
};
