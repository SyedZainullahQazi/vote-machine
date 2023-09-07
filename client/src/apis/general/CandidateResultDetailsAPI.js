import axios from "axios";
import {useNavigate} from "react-router-dom";
export default async function CandidateResultDetailsAPI(token, scheduleId,halkaId) {
  try {
    const headers = {
      Authorization:`Bearer ${token}`,
    };
    const requestBody = {
      scheduleId,
      halkaId,
    };
    const response = await axios.post(`${process.env.REACT_APP_HOST}/api/generals/candidate-result-details`,
     requestBody, { headers });
    if (response.status === 200) {
      const populatedCandidates = response.data;
      return populatedCandidates;
    } else 
    {
      console.error('Server returned an error:', response.status, response.data);
    }
  } catch (error) {
    console.error('Error sending candidates to server:', error.message);
  }
}
