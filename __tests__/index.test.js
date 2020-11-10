import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFixturePath, readFixtureFile } from '../src/utils.js';

const expectedStylish = readFixtureFile('expectedStylish');
const expectedPlain = readFixtureFile('expectedPlain');

const dataJson1 = getFixturePath('file1.json');
const dataJson2 = getFixturePath('file2.json');

test('testing deep json', () => {
  expect(genDiff(dataJson1, dataJson2, 'stylish')).toBe(expectedStylish);
});

const dataYml1 = getFixturePath('file1.yml');
const dataYml2 = getFixturePath('file2.yml');

test('testing deep yml', () => {
  expect(genDiff(dataYml1, dataYml2, 'stylish')).toBe(expectedStylish);
});

test('testing plain json', () => {
  expect(genDiff(dataYml1, dataYml2, 'plain')).toBe(expectedPlain);
});

test('testing plain yml', () => {
  expect(genDiff(dataYml1, dataYml2, 'plain')).toBe(expectedPlain);
});
