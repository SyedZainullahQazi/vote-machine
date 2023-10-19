import axios from 'axios'
import {toast} from 'react-toastify'

const GetPendingApprovalsAPI = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/admin/candidate-application/get`,{headers: {authorization:`Bearer ${token}`,}});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to retrieve pending approvals');
    }
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    throw error;
  }
};

export const ApproveCandidateAPI = async (token, approved) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}/api/admin/candidate-application/approved`,
      approved,
      {headers: {authorization:`Bearer ${token}`,}}
    );

    if (response.status === 200) {
      toast.success('Candidate approved successfully');
    } else {
      throw new Error('Failed to approve candidate');
    }
  } catch (error) {
    console.error('Error approving candidate:', error);
    toast.error('Failed to approve candidate');
    throw error;
  }
};

export const RejectCandidateAPI = async (token, approved) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}/api/admin/candidate-application/reject`,
      approved,
      {headers: {authorization:`Bearer ${token}`,}}
    );

    if (response.status === 200) {
      toast.success('Candidate Disapproved');
    } else {
      throw new Error('Failed to Disapprove candidate');
    }
  } catch (error) {
    console.error('Error disapproving candidate:', error);
    toast.error('Failed to disapprove candidate');
  }
};


export default GetPendingApprovalsAPI;
