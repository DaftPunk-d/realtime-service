'use strict';

const passwordHash = require('password-hash');
// const hashIds = new HashIds('quiz:ACtCbvXcUqxrt46j', 16);
// export function decode(userId: string | number): string {
//   // return hashIds.decode(userId)[0];
//   return '';
// }
// CHECK: https://www.npmjs.com/package/password-hash
/***
 * Hashes password and returns it
 * @param password
 * @returns {any}
 */
export function encode(password: string): string {
  return passwordHash.generate(password);
}

/***
 * Verifies password and returns true OR false!
 * GEBRUIK DEZE FUNCTIE BIJ HET INLOGGEN VAN DE GEBRUIKER OM TE KIJKEN OF HET WACHTWOORD OVEREENKOMT MET DE INPUT!
 * @param password
 * @param hashedPassword
 * @returns {void|boolean|PromiseLike<boolean>|Promise<void>}
 */
export function verivy(password: string, hashedPassword: string): boolean{
    return passwordHash.verify(password, hashedPassword)
}
