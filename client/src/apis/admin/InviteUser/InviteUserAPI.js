import axios from "axios";
import { toast } from "react-toastify";

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

    const message = response.data.message;

    if (response.status === 200) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      throw new Error(`HTTP status ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        const errorMessage = error.response.data.message || "Cannot Update Right Now";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (error.response.status === 404 || error.response.status === 500) {
        const errorMessage = error.response.data.message || "An error occurred.";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
};
