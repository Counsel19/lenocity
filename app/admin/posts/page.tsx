"use client";

import ConfirmationDialog from "@/components/dashbaord/ConfirmationDialog";
import PostTableBody from "@/components/news/PostTableBody";
import CustomTable from "@/components/shared/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  deleteBlogPost,
  fetchAllNewsPost,
} from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AllPostProps {}
const AllPost: FC<AllPostProps> = () => {
  const { allNewsPost, singleNewsPost } = useSelector(
    (store: RootState) => store.news
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen } = useSelector((store: RootState) => store.modal);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await dispatch(fetchAllNewsPost());

        if (res.type.includes("rejected"))
          return toast({
            title: "An Error Occurred",
            description: res.payload as string,
            variant: "destructive",
          });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error.response?.status === 400 ||
            error.response?.status === 401
          ) {
            return toast({
              title: "Error Fetching Post",
              description: error.response?.data,
              variant: "destructive",
            });
          }
        }
      }
    };

    getData();
  }, []);

  const confirmModal = async () => {
    if (!singleNewsPost) return;
    try {
      const res = await dispatch(deleteBlogPost(singleNewsPost._id));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      await dispatch(fetchAllNewsPost());
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Deleting News Post",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Deleting News Post",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 space-y-20 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[2rem]">All Blog Post</h3>

        <Link href={"/admin/posts/new"} className={cn(buttonVariants({}))}>
          <Plus />
          Create News Post
        </Link>
      </div>
      <CustomTable
        tableBody={<PostTableBody />}
        headingList={newsPostTableHeading}
        numberOfPages={allNewsPost ? allNewsPost.length : 0}
        currentPage={currentPage}
        handleSelectPage={async (index: number) =>
          await dispatch(fetchAllNewsPost(index))
        }
        handlePrevPage={async () =>
          await dispatch(
            fetchAllNewsPost(currentPage > 1 ? currentPage - 1 : currentPage)
          )
        }
        handleNextPage={async () =>
          await dispatch(fetchAllNewsPost(currentPage + 1))
        }
      />
      {isOpen && <ConfirmationDialog confirmModal={confirmModal} />}
    </div>
  );
};

const newsPostTableHeading = ["User", "Image", "Title", "Body ", "Posted At"];

export default AllPost;
