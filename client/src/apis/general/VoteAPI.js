import axios from "axios"
import {toast} from "react-toastify"

export const VoteAPI=async (token, candidateId, voterId)=> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/api/generals/vote/vote`,
       {candidateId,voterId}, 
      { headers:{authorization:`Bearer ${token}`} });
        if (response.status === 200) {
        const message = 'Vote successful';
        toast.success(message);
      } else {
        const message = 'Vote failed';
        toast.error(message);
      }
    } catch (error) {
      const message = 'Error voting';
      toast.error(message);
    }
}

