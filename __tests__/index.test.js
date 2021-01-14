import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFixtureFile } from '../src/utils.js';

const generatePathname = (path) => new URL(`../__fixtures__/${path}`, import.meta.url).pathname;

const expectedStylish = readFixtureFile('expectedStylish');
const expectedPlain = readFixtureFile('expectedPlain');
const expectedJson = readFixtureFile('expectedJson.json');

const dataJson1 = generatePathname('file1.json');
const dataJson2 = generatePathname('file2.json');

// json files test
test('testing default json', () => {
  expect(genDiff(dataJson1, dataJson2)).toBe(expectedStylish);
});

test('testing json json', () => {
  expect(genDiff(dataJson1, dataJson2, 'json')).toBe(expectedJson);
});

test('testing json stylish', () => {
  expect(genDiff(dataJson1, dataJson2, 'stylish')).toBe(expectedStylish);
});

test('testing json plain', () => {
  expect(genDiff(dataJson1, dataJson2, 'plain')).toBe(expectedPlain);
});

// yml files test
const dataYml1 = generatePathname('file1.yml');
const dataYml2 = generatePathname('file2.yml');

test('testing yml default', () => {
  expect(genDiff(dataYml1, dataYml2)).toBe(expectedStylish);
});

test('testing yml json', () => {
  expect(genDiff(dataYml1, dataYml2, 'json')).toBe(expectedJson);
});

test('testing yml stylish', () => {
  expect(genDiff(dataYml1, dataYml2, 'stylish')).toBe(expectedStylish);
});

test('testing yml plain', () => {
  expect(genDiff(dataYml1, dataYml2, 'plain')).toBe(expectedPlain);
});

// ini files test
const dataIni1 = generatePathname('file1.ini');
const dataIni2 = generatePathname('file2.ini');

test('testing ini default', () => {
  expect(genDiff(dataIni1, dataIni2)).toBe(expectedStylish);
});

test('testing ini json', () => {
  expect(genDiff(dataIni1, dataIni2, 'json')).toBe(expectedJson);
});

test('testing ini stylish', () => {
  expect(genDiff(dataIni1, dataIni2, 'stylish')).toBe(expectedStylish);
});

test('testing ini plain', () => {
  expect(genDiff(dataIni1, dataIni2, 'plain')).toBe(expectedPlain);
});
