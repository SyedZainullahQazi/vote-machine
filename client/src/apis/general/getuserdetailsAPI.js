import axios from 'axios';
import { toast} from "react-toastify";

export const GetUser=async(token)=>{
    try{
        const response=await axios.post(
            `${process.env.REACT_APP_HOST}/api/generals/user-details`,
            {token:`Bearer ${token}`}
        );
        return response;
    }
    catch(error)
    {
        throw error;
    }
};
export const GetUserForInvitesAPI = async (token) => {

  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/generals/user-details/for-invite`, {
      headers: {
        authorization:`Bearer ${token}`,
      }
    });
    return response.data.users;
  } catch (error) {
    console.error(error);
    toast.error('An error occurred while fetching users for invites.');
  }
};


