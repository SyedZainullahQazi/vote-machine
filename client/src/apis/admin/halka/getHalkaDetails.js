import axios from 'axios';

const GetHalkaDetails = async (newToken) => {
  const headers={};
  headers['authorization']=newToken;
  console.log("Get Halka Details");
  console.log(newToken);

  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/admin/halka/get-halka-data`,{headers:headers});
    const halkaData = response.data;
    console.log(halkaData);
    return halkaData;
  } 
  catch (error) {
    console.error(error);
    return [];
  }
};

export default  GetHalkaDetails;
