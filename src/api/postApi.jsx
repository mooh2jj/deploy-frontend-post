import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("BASE_URL", BASE_URL);

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("포스트 데이터를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export default {
  fetchPosts,
};
