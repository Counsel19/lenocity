import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IAddNews } from "@/types/news";
// import { IMembershipForm } from "@/types/membership";

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const fetchAllNewsPost = createAppAsyncThunk(
  "news/fetchAllNewsPost",
  async (page: number | undefined, thunkAPI) => {
    try {
      const path = page ? `/blogs?page=${page}` : "/blogs";
      const res = await axiosInstance.get(path);

      return {
        blogs: res.data.blogs,
        currentPage: res.data.currentPage,
        total: res.data.total,
        numberOfPages: res.data.numberOfPages,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Get all News Post");
    }
  }
);
export const fetchBlogPostById = createAppAsyncThunk(
  "news/fetchBlogPostById",
  async (blogId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/blogs/${blogId}`);

      return res.data.blog
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single News Post");
    }
  }
);

export const createBlogPost = createAppAsyncThunk(
  "news/createBlogPost",
  async (payload: IAddNews, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/blogs`, payload);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Create News Post");
    }
  }
);

interface IUpdateEvent {
  payload: IAddNews;
  postId: string;
}

export const updateBlogPost = createAppAsyncThunk(
  "news/updateBlogPost",
  async ({ postId, payload }: IUpdateEvent, thunkAPI) => {
    try {
      const res = await axiosInstance.patch(`/blogs/${postId}`, payload);

      return res.data.blog;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Get Update News Post");
    }
  }
);


export const deleteBlogPost = createAppAsyncThunk(
  "news/deleteBlogPost",
  async (blogId: string, thunkAPI) => {
    try {
      await axiosInstance.delete(`/blogs/${blogId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Delete News Post");
    }
  }
);
