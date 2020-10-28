/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const data1 = readFile('file1.json');
const data2 = readFile('file2.json');
const expected = readFile('expected');

test('reverse', () => {
  expect(genDiff(data1, data2, 'json')).toBe(expected);
});
