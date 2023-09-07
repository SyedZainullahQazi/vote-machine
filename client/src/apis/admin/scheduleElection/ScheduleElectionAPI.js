import axios from "axios";
import { toast } from "react-toastify";

export default async function ScheduleElectionAPI(token, data) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/api/admin/schedule-elections/add-schedule`,
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const { status, data: responseData } = response;

    if (response.status === 200) {
      const message = responseData.message;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } 
     else if (status === 500) {
      const errorMessage = responseData.message || "An error occurred";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    if (error.response.status === 409) {
      const message = error.response.data.message;
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, { theme: 'dark' });
    } 
    else
    {
      toast.error("An error occurred. again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
}
export const fetchElectionSchedules = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/admin/schedule-elections/get-schedules`,
    {headers:{authorization:`Bearer ${token}`}});
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching election schedules:', error);
    toast.error('An error occurred while fetching election schedules. Please try again later.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const deleteElectionSchedule = async (token, _id) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_HOST}/api/admin/schedule-elections/delete-schedule`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          _id: _id,
        },
      }
    );

    toast.success("Election schedule deleted successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });

  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred.";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
};

export const updateElectionScheduleAPI = async (token, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}/api/admin/schedule-elections/update-schedule`,
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Election schedule updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Failed to update election schedule", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred.";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
};
