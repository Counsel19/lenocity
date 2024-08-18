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
      // const res = await axiosInstance.get(`/gallery`);

      // return res.data.gallery;

      return [
        {
          _id: "1",
          title: "First Cohort Web Deb Training 2024",
          path: "/images/little-boy-laptop.jpg",
          created_at: "",
        },
        {
          _id: "2",
          title: "First Cohort Web Deb Training 2024",
          path: "/images/little-boy-laptop.jpg",
          created_at: "",
        },
        {
          _id: "3",
          title: "First Cohort Web Deb Training 2024",
          path: "/images/little-boy-laptop.jpg",
          created_at: "",
        },
        {
          _id: "4",
          title: "First Cohort Web Deb Training 2024",
          path: "/images/little-boy-laptop.jpg",
          created_at: "",
        },
      ];
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Gallery");
    }
  }
);
