const CryptoJS = require("crypto-js");
const logger = require("./loggerUtils");
const commonUtils = require("./commonUtils");

const getTrippleDESEncrypted = (string) => {
  try {
    let keyString = process.env.KEYSTRING;
    let ivString = process.env.IVSTRING;
    let hashkey = CryptoJS.MD5(commonUtils.decodeToBase64(keyString));
    return CryptoJS.TripleDES.encrypt(string, hashkey, {
      iv: CryptoJS.enc.Utf8.parse(ivString),
      mode: CryptoJS.mode.CBC,
    }).toString();
  } catch (err) {
    logger.info("ERROR - getTripleDESEncrypted ");
    logger.error(err.message);
  }
};

const trippleDesUtils = {
  getTrippleDESEncrypted,
};

module.exports = trippleDesUtils;
