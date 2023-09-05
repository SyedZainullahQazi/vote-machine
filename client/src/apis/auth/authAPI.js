import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = `${process.env.REACT_APP_HOST }/api/auth`;

export const signupAPI = async (formData) => {
  
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
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, { theme: 'dark' });

    } else {
      toast.error('An error occurred', { theme: 'dark' });
    }
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
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, { theme: 'dark' });

    } else {
      toast.error('An error occurred', { theme: 'dark' });
    }
    throw error;
  }
};
