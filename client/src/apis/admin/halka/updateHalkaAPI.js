import axios from 'axios';
import { toast } from 'react-toastify';

export const UpdateHalkaAPI = async (token, halkaData) => {
  try {
   
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}/api/admin/halka/update-halka`,
      {
        halkaId: halkaData.halkaId,
        halkaIdNew: halkaData.halkaIdNew,
        halkaName:halkaData.halkaName,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
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
