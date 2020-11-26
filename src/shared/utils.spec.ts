import { httpExceptions } from 'src/common';

import { formatString, getHttpErrorName, transformToArray } from './utils';

const testStr = 'teste,teste,teste';
const testArr = ['teste', 'teste', 'teste'];

describe('Utils (unit)', () => {
  it('should be return a valid http exception from status code', () => {
    Object.entries(httpExceptions).forEach(([error, response]) => {
      expect(getHttpErrorName(Number(error))).toEqual(response);
    });
  });

  it('should be transform ingredients string list to array', () => {
    expect(transformToArray(testStr)).toEqual(testArr);
  });

  it('should be format string', () => {
    expect(formatString(`\t\t\n ${testStr}&#233; \n\n\n\n`)).toEqual(
      `${testStr}é`,
    );
  });
});
