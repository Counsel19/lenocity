import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
// import { IMembershipForm } from "@/types/membership";

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: "https://api.niprfct.org.ng/api",
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window == "undefined") return config;
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

export const fetchResource = createAppAsyncThunk(
  "resource/fetchResource",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/resource`);

      return res.data.data.resources;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);
export const fetchSingleResource = createAppAsyncThunk(
  "resource/fetchSingleResource",
  async (resoureId:string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/resource/${resoureId}`);

      return res.data.data.resource;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);
