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
