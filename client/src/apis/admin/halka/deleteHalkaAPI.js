import axios from 'axios';
import { toast } from 'react-toastify';

export const DeleteHalkaAPI = async ( token,halkaIds) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_HOST}/api/admin/halka/delete-halka`,
      {
        headers: {
          authorization:`Bearer ${token}`,
          halkaId:halkaIds,
        }
      }
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
