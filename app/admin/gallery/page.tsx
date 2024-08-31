"use client";

import { Plus } from "lucide-react";
import React, { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  deleteItemFromGallery,
  fetchGallery,
} from "@/lib/redux/slices/gallery/galleryThunk";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { IGallery } from "@/types/gallery";
import Link from "next/link";
import PageLoader from "@/components/shared/PageLoader";
import GalleryCard from "@/components/dashbaord/GalleryCard";
import ConfirmationDialog from "@/components/dashbaord/ConfirmationDialog";

interface GalleryProps {}
const Gallery: FC<GalleryProps> = () => {
  //   const [open, setOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<IGallery[] | null>(null);

  //   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  //   const [imageId, setImageId] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { gallery, selectedGalleryItem, isLoading } = useSelector(
    (store: RootState) => store.gallery
  );
  const { isOpen } = useSelector((store: RootState) => store.modal);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(fetchGallery());
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (gallery) {
      setGalleryData(gallery);
    }
  }, [gallery]);

  const handleDeleteGalleryItem = async () => {
    if (!selectedGalleryItem) return;
    try {
      const res = await dispatch(
        deleteItemFromGallery(selectedGalleryItem._id)
      );

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      await dispatch(fetchGallery());
      toast({
        title: "Gallery Item Deleted",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Signing Up",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Login in",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col ">
      <div className=" flex items-center justify-between">
        <h3 className="font-bold text-[2rem]">Gallery</h3>
        <Link className={cn(buttonVariants())} href="/admin/gallery/new">
          <Plus /> Add Image
        </Link>
      </div>
      <div className="bg-[#fff] flex flex-col pt-[23px] pl-[33px] pr-[33px] pb-[76px] mt-[28px] rounded">
        {isLoading ? (
          <PageLoader />
        ) : (
          <div
            className={`${
              galleryData && galleryData?.length > 0
                ? "grid grid-cols-3 gap-[32px]"
                : "flex items-center justify-center"
            } mt-[29px]`}
          >
            {galleryData && galleryData?.length > 0 ? (
              gallery?.map((item, index) => (
                <React.Fragment key={index}>
                  <GalleryCard data={item} />
                </React.Fragment>
              ))
            ) : (
              <p className="text-2xl text-[#000] text-center font-semibold">
                No Images Available
              </p>
            )}
          </div>
        )}
      </div>

      {isOpen && <ConfirmationDialog confirmModal={handleDeleteGalleryItem} />}
    </div>
  );
};

export default Gallery;
