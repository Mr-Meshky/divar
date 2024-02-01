import axios from "axios";
import { toast } from "react-toastify";

import api from "configs/api";

import { getCookie } from "utils/cookie";

const addPost = async (formData) => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}post/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error("مشکلی پیش آمده است");
    return false;
  }
};

const getMyPosts = () => api.get("post/my");

const deletePost = (id) => api.delete(`post/delete/${id}`);

export { addPost, getMyPosts, deletePost };
