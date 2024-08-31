"use client"

import React, { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import PageLoader from "@/components/shared/PageLoader";
import NewsCard from "./molecules/NewsCard";
import { fetchAllNewsPost } from "@/lib/redux/slices/news/newsThunk";

interface NewsGridProps {
  sliceAt?: number;
}
const NewsGrid: FC<NewsGridProps> = ({ sliceAt }) => {
  const { allNewsPost } = useSelector((store: RootState) => store.news);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllNewsPost());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      {allNewsPost && allNewsPost.length > 0 ? (
        allNewsPost.slice(0, sliceAt ? sliceAt : allNewsPost.length ).map((newsPost) => (
          <React.Fragment key={newsPost._id}>
            <NewsCard data={newsPost} />
          </React.Fragment>
        ))
      ) : allNewsPost && allNewsPost.length == 0 ? (
        <h3 > No Held News Post at the Moment</h3>
      ) : (
        <div className="col-span-3">
          <PageLoader />
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
