import axios from 'axios';
import { toast } from 'react-toastify';

const updateCandidateStatusAPI = async (formData,token) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_HOST}/api/user/update-candidate`,formData,
    {headers:{authorization:`Bearer ${token}`,'Content-Type': 'multipart/form-data',}});

    const responseData = response.data;
    if (response.status === 200) {
      toast.success(responseData.message);
    } else {
      toast.warning('An unexpected error occurred');
    }
    return responseData;
  } catch (error) {
    console.error('Error updating candidate status:', error);

    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 500) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Error updating candidate status');
    }
    throw error;
  }
};

export default updateCandidateStatusAPI;
