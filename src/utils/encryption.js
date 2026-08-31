import CryptoJS from "crypto-js";

const SECRET_KEY = "SMART_CAMPUS_SECRET";

export const encryptData = (text) => {
  return CryptoJS.AES.encrypt(
    text,
    SECRET_KEY
  ).toString();
};

export const decryptData = (cipher) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      cipher,
      SECRET_KEY
    );

    return bytes.toString(
      CryptoJS.enc.Utf8
    );
  } catch {
    return cipher;
  }
};