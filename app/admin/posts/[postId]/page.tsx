"use client"

import CustomLoader from "@/components/shared/CustomerLoader";
import LabledInput from "@/components/shared/LabledInput";
import { Button } from "@/components/ui/button";
import { fetchBlogPostById } from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


interface ViewSinglePostProps {}

const ViewSinglePost: FC<ViewSinglePostProps> = () => {
  const { isLoading, singleNewsPost } = useSelector(
    (store: RootState) => store.news
  );

 
  const { postId } = useParams();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = () => {
      if (!postId) return;
      try {
        postId;
        dispatch(fetchBlogPostById(postId as string));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => router.back()} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">View News Post </h4>
        <p className="text-base text-slate-500">Manage News Post Here</p>
      </div>
      {isLoading || !singleNewsPost ? (
        <div>
          <CustomLoader />{" "}
        </div>
      ) : (
        <div className="space-y-12">
          <LabledInput
            label="Title"
            name="title"
            value={singleNewsPost.title}
            placeholder="Post Title"
          />

          <Image
            width={800}
            height={800}
            className="h-[20rem] border p-4 rounded-md"
            src={singleNewsPost.image}
            alt={singleNewsPost.title}
          />

          <div className=" flex min-h-[80px] w-full rounded-md border border-input bg-background px-6 py-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <div
              dangerouslySetInnerHTML={{ __html: singleNewsPost.body }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSinglePost;
