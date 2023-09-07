import axios from 'axios';

export async function FetchClosestScheduleAPI(closestSchedule) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/generals/closest-schedule`,{headers:{Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}});
    const newClosestSchedule = response.data;
    return newClosestSchedule;
  } catch (error) {
    console.error('Error fetching closest schedule:', error);
  }
}
