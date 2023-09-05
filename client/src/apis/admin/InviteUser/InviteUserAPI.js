import axios from "axios";
import {toast} from "react-toastify"

// InviteUserAPI.js

export const InviteUserAPI = async (token, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}/api/admin/InviteUser/Invite`,
      data,
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.status === 200) {
      const message = response.data.message; // Extract the message from the response
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (response.status === 404) {
      const errorMessage = response.data.message; // Extract the error message from the response
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (response.status === 500) {
      const errorMessage = response.data.message; // Extract the error message from the response
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    toast.error("An error occurred. Please try again later.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
