import { httpExceptions } from 'src/common';

export const getHttpErrorName = (statusCode: number) => {
  return httpExceptions[statusCode.toString()];
};

export const transformToArray = (values: string) => {
  return values
    .split(',')
    .map((value) => value.trim())
    .sort();
};

export const formatString = (str: string) => {
  str = str.replace(/(\r\n|\n|\r|\t)/gm, '').trim();

  return str.replace(/&#([0-9]{1,3});/gi, (_, index) => {
    const charCode = parseInt(index, 10);
    return String.fromCharCode(charCode);
  });
};
