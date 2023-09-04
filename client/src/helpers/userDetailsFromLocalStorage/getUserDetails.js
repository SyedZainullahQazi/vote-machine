import CryptoJS from 'crypto-js';

const getUserDetailsFromLocalStorage = () => {
    const encryptedUserDetails = localStorage.getItem("userDetails");
    if (encryptedUserDetails) {
    const decryptedUserDetails = CryptoJS.AES.decrypt(
      encryptedUserDetails,
      `${process.env.JWT_SECRET}`
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedUserDetails);
  }
  return null;
};

export default getUserDetailsFromLocalStorage;
