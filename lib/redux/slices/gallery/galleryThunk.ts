import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
// import { IMembershipForm } from "@/types/membership";

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window == "undefined") return config;
    const authToken = window.sessionStorage.getItem("authToken");

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

export const fetchGallery = createAppAsyncThunk(
  "gallery/fetchGallery",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/gallery`);

      return {
        gallery: res.data.gallery,
        currentPage: res.data.currentPage,
        total: res.data.total,
        numberOfPages: res.data.numberOfPages,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Get Gallery");
    }
  }
);

export const addToGallery = createAppAsyncThunk(
  "gallery/addToGallery",
  async (payload: { title: string; image: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/gallery`, payload);

      return res.data.galleryItem;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Get Gallery");
    }
  }
);
export const deleteItemFromGallery = createAppAsyncThunk(
  "gallery/deleteItemFromGallery",
  async (itemId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/gallery/${itemId}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue("Could not Delete Gallery Item");
    }
  }
);
