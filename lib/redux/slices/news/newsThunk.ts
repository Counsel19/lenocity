import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
// import { IMembershipForm } from "@/types/membership";

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: "https://api.niprfct.org.ng/api",
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
  async (_, thunkAPI) => {
    try {
      // const res = await axiosInstance.get(`/post`);

      // return res.data.data.posts;

      return [
        {
          id: 1,
          user_id: 101,
          title: "Kids Code Their Way to Success at Summer Bootcamp",
          image: "/images/little-boy-laptop.jpg",
          body: "Our recent summer bootcamp was a huge success, with kids learning the basics of coding through fun and interactive sessions. The week-long event culminated in a showcase where participants presented their own websites and apps.",
          created_at: "2024-08-01T10:00:00Z",
          updated_at: "2024-08-01T10:00:00Z",
        },
        {
          id: 2,
          user_id: 102,
          title: "Graphic Design Workshop Sparks Creativity in Young Artists",
          image: "/images/little-boy-laptop.jpg",
          body: "Our graphic design workshop brought out the creative side of our young participants. They learned how to use professional design tools to create stunning visual projects, from logos to posters, all while having a blast.",
          created_at: "2024-08-10T14:30:00Z",
          updated_at: "2024-08-10T14:30:00Z",
        },
        {
          id: 3,
          user_id: 103,
          title: "New Computer Appreciation Course Launches This Fall",
          image: "/images/little-boy-laptop.jpg",
          body: "We're excited to announce the launch of our new Computer Appreciation course this fall. This beginner-friendly course will introduce kids to the basics of computers, helping them gain confidence in using technology effectively.",
          created_at: "2024-08-15T08:45:00Z",
          updated_at: "2024-08-15T08:45:00Z",
        },
      ];
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get all News Post");
    }
  }
);
export const fetchNewsPostById = createAppAsyncThunk(
  "news/fetchNewsPostById",
  async (newsId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/post/${newsId}`);

      return res.data.data.Post;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single News Post");
    }
  }
);
