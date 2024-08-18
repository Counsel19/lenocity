"use client";

import PageLoader from "@/components/shared/PageLoader";

import { fetchNewsPostById } from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import PageTitle from "@/components/shared/PageTitle";

interface SingleNewsPostProps {}
const SingleNewsPost: FC<SingleNewsPostProps> = () => {
  const { singleNewsPost } = useSelector((store: RootState) => store.news);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { blogId } = useParams();
  useEffect(() => {
    if (!blogId) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchNewsPostById(blogId as string));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className=" space-y-20 relative">
      <PageTitle title="Our Blogs" />
      <div className=" hidden  bg-[url('/images/bg-deco.svg')] bg-cover bg-center absolute top-0 right-0 w-[60%] h-screen md:flex z-0" />
      {singleNewsPost && !isLoading ? (
        <>
          <img
            src={singleNewsPost.image as string}
            alt={singleNewsPost.image as string}
            className="h-[28.5rem] relative w-frame pagePadding"
          />

          <div className="w-frame pagePadding space-y-8">
            <h3 className="font-semibold text-primary leading-[5.58rem] text-[4.2rem]">
              {singleNewsPost.title}
            </h3>

            <div
              className="text-[1.55rem] space-y-4 leading-[2.8rem]"
              dangerouslySetInnerHTML={{ __html: singleNewsPost.body }}
            ></div>
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default SingleNewsPost;
