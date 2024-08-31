"use client";

import PageLoader from "@/components/shared/PageLoader";
import PageTitle from "@/components/shared/PageTitle";
import { fetchGallery } from "@/lib/redux/slices/gallery/galleryThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface GalleryProps {}
const Gallery: FC<GalleryProps> = () => {
  const { gallery } = useSelector((store: RootState) => store.gallery);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchGallery());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="grid gap-20">
      <div className="hidden  bg-[url('/images/bg-deco.svg')] bg-cover bg-center absolute top-0 right-0 w-[60%] h-[200px] md:flex z-0" />
      <PageTitle title="Gallery" />
      <div className="space-y-28 w-frame">
        <div className="lg:w-[60%] mx-auto space-y-8">
          <h3 className=" text-[2.4rem] lg:text-[4.8rem] text-center text-primary lg:leading-[6rem]">
            A picture is worth more than a thousand words
          </h3>
          <p className="text-[#667085] text-center text-[1.6rem] lg:text-2xl leading-[3rem]">
            Explore on galleries to see pictures of past trainings, meetings and
            other events
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {gallery ? (
            gallery?.map((item, index) => (
              <Image
                key={index}
                src={item.image as string}
                alt={item.image as string}
                className="h-[35rem] object-cover"
                height={500}
                width={500}
              />
            ))
          ) : (
          <div className="col-span-3">
              <PageLoader />
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
