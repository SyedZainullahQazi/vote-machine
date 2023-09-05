import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateHalkaAPI = async (newHalka, newToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/api/admin/halka/create-halka`,
      { halka: newHalka, token: newToken }
    );

    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, { theme: 'dark' });
    } else {
      toast.error('An error occurred', { theme: 'dark' });
    }
  }
};
