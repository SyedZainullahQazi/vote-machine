import axios from 'axios';

export const sendResetPasswordEmail = async (cnic) => {
  const loginData = {
    cnic: cnic,
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/auth/reset-password",
      loginData
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  const updateData = {
    password: newPassword,
  };

  try {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/auth/reset-password/${token}`,
      updateData
    );

    return response;
  } catch (error) {
    throw error;
  }
};
