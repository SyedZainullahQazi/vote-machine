import axios from 'axios';
const baseurl=process.env.REACT_APP_HOST ||"127.0.0.1:5000"

export const sendResetPasswordEmail = async (cnic) => {
  const loginData = {
    cnic: cnic,
  };

  try {
    const response = await axios.post(
      `${baseurl}/api/auth/reset-password`,     
      loginData
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (OTPCode, newPassword) => {
  const updateData = {
    password: newPassword,
    OTP:OTPCode,
  };

  try {
    const response = await axios.post(
      `${baseurl}/api/auth/reset-password/new-password`,
      updateData
    );

    return response;
  } catch (error) {
    throw error;
  }
};
