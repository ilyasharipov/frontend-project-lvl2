/* eslint-disable no-underscore-dangle */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export {
  getFilePath,
  readFile,
  getFixturePath,
  readFixtureFile,
};
