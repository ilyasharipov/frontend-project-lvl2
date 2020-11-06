import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFixturePath, readFixtureFile } from '../src/utils.js';

const expected = readFixtureFile('expected2');

const dataJson1 = getFixturePath('file1.json');
const dataJson2 = getFixturePath('file2.json');

test('testing flat json', () => {
  expect(genDiff(dataJson1, dataJson2, 'json')).toBe(expected);
});

// const dataYml1 = getFixturePath('file1.yml');
// const dataYml2 = getFixturePath('file2.yml');
//
// test('testing flat yml', () => {
//   expect(genDiff(dataYml1, dataYml2, 'yml')).toBe(expected);
// });
//
// const expected2 = readFixtureFile('expected2');
