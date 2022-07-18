const bcrypt = require ('bcrypt');
const configIndex = require("./../config")
/* 
* Used to encrypt text and return
*/
async function encrypt(rawText) {
    let encryptText;
    try {
        encryptText = await bcrypt.hash(rawText, configIndex.constants.SALT_ROUND);
    } catch (error) {
        throw error;
    }
    return encryptText;
}
/* 
* Used to compare encrypt text and return boolean 
*/
async function compare(rawText,hash) {
    let isMatched = false;
    try {
        isMatched = await bcrypt.compare(rawText,hash);
        console.log("isMatched  ",isMatched);
    } catch (error) {
        throw error;
    }
    return isMatched;
}

module.exports = {
    encrypt: encrypt,
    compare: compare
}