import _ from 'lodash';

const buildNode = (key, beforeValue, afterValue, type, children) => {
    return {
        key: key,
        beforeValue: beforeValue,
        afterValue: afterValue,
        type: type,
        children: children,
    };
}

const getAst = (beforeFile, afterFile) => {
  const keys = _.union(Object.keys(beforeFile), Object.keys((afterFile))).sort();

  const ast = keys.reduce((acc, key) => {
      if (!_.has(beforeFile, key)) {
        acc.push(buildNode(key, null, afterFile[key], 'added', null));
      } else if (!_.has(afterFile, key)) {
        acc.push(buildNode(key, beforeFile[key], null, 'deleted', null));
      } else if (_.has(beforeFile, key) && _.has(afterFile, key)) {
          if (_.isObject(beforeFile[key]) && _.isObject(afterFile[key])) {
            acc.push(buildNode(key, null, null, 'nested', getAst(beforeFile[key], afterFile[key])));
          } else {
              if (beforeFile[key] === afterFile[key]) {
                  acc.push(buildNode(key, beforeFile[key], null, 'unchanged', null));
              } else {
                  acc.push(buildNode(key, beforeFile[key], afterFile[key], 'changed', null));
              }
          }
      }

      return acc;
  }, []);
  return ast;
};
export default getAst;
