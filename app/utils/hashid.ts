'use strict';

const HashIds = require('hashids');
const hashIds = new HashIds('quiz:ACtCbvXcUqxrt46j', 16);
export function decode(userId: string | number): string {
  return hashIds.decode(userId)[0];
}

export function encode(userId: string): string {
  return hashIds.encode(parseInt(userId));
}
