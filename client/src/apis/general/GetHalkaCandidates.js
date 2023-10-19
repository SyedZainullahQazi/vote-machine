import axios from 'axios';
export const GetHalkaCandidatesAPI = async (token, halkaId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/api/generals/vote/get-halka-candidates`,
      { halkaId },
      {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
