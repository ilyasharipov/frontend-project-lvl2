import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFixturePath, readFixtureFile } from '../src/utils.js';

const data1 = getFixturePath('file1.json');
const data2 = getFixturePath('file2.json');
const expected = readFixtureFile('expected');

test('reverse', () => {
  expect(genDiff(data1, data2, 'json')).toBe(expected);
});
