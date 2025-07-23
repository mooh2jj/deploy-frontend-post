import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("BASE_URL", BASE_URL);

// 모든 게시물 가져오기
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/posts`);
    return response.data;
  } catch (error) {
    console.error("포스트 데이터를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 특정 ID의 게시물 가져오기
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `ID ${id}의 포스트 데이터를 가져오는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};

// 새 게시물 생성하기
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/posts`, postData);
    return response.data; // 생성된 게시물의 ID 반환
  } catch (error) {
    console.error("포스트 생성 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 게시물 수정하기
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/posts/${id}`, postData);
    return response.data; // 수정된 게시물의 ID 반환
  } catch (error) {
    console.error(`ID ${id}의 포스트 수정 중 오류가 발생했습니다:`, error);
    throw error;
  }
};

// 게시물 삭제하기
export const deletePost = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/posts/${id}`);
    return id; // 삭제된 게시물의 ID 반환
  } catch (error) {
    console.error(`ID ${id}의 포스트 삭제 중 오류가 발생했습니다:`, error);
    throw error;
  }
};

export default {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
};
