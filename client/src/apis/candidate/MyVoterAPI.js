import axios from "axios";

const MyVoterAPI = async (token, halkaId) => {
  try {
    const data = { halkaId };
    const response = await axios.post(
    `${process.env.REACT_APP_HOST}/api/candidate/get-voters-in-halka`, 
    data, { headers:{authorization:`Bearer ${token}`} });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default MyVoterAPI;

