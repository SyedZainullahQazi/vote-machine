import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://127.0.0.1:5000/api/auth';

export const signupAPI = async (formData) => {
  console.log("------------------");
  console.log(formData);
  console.log("------------------");

  try {
    const response = await axios.post(`${BASE_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      const token = response.data.token;
      toast.success('You Have Registered Successfully', { theme: 'dark' });
      return token;
    }
  } catch (error) {
    toast.error('CNIC OR Email Already Exists', { theme: 'dark' });
    throw error;
  }
};

export const loginAPI = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);

    if (response.status === 200) {
      const token = response.data.token;
      return token;
    }
  } catch (error) {
    toast.error('Login Failed - WRONG CREDS', { theme: 'dark' });
    throw error;
  }
};
