import path from 'path';
import getDiff from './astBuilder';
import parser from './parsers.js';
import getStylishData from "./formatters/stylish";

export default (beforeFile, afterFile, format) => {
  const formatBeforeFile = path.extname(beforeFile);
  const formatAfterFile = path.extname(afterFile);
  console.log(format);
  const obj1 = parser(beforeFile, formatBeforeFile);
  const obj2 = parser(afterFile, formatAfterFile);

  const diff = getDiff(obj1, obj2);

  return getStylishData(diff);
};
