import axios from 'axios';

export const GetUser=async(token)=>{
    try{
        const response=await axios.post(
            `${process.env.REACT_APP_HOST}/api/generals/user-details`,
            {token:token}
        );
        return response;
    }
    catch(error)
    {
        throw error;
    }
}