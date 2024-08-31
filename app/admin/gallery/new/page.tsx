"use client";

import GalleryForm from "@/components/gallery/GalleryForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addToGallery } from "@/lib/redux/slices/gallery/galleryThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { IAddGallery } from "@/types/gallery";
import axios, { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddToGalleryProps {}
const AddToGallery: FC<AddToGalleryProps> = () => {
  const [newGalleryItem, setNewGalleryItem] = useState<IAddGallery>({
    title: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewGalleryItem({ ...newGalleryItem, [name]: value });
  };

  const handleAddToGallery = async () => {
    try {
      setIsLoading(true);
      if (!imageFile) {
        return toast({
          title: "Please Provide an Image",
          variant: "destructive",
        });
      }
      const imageData = new FormData();
      imageData.append("file", imageFile);
      imageData.append("upload_preset", "lenocity_repo");
      const imageResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        imageData
      );

      const { url: imageUrl } = imageResponse.data;

      const payload = {
        title: newGalleryItem.title,
        image: imageUrl as string,
      };
      const res = await dispatch(addToGallery(payload));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Item Added to Gallery Successfully ",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Adding Item",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Adding Item",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-12 p-8 grid items-start bg-white ">
      <Button className="w-fit" onClick={() => router.back()} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-12">
        <div className="space-y-6">
          <h4 className="leading-[3rem] text-[2.5rem]">Add Item to Gallery </h4>
          <p className="text-base text-slate-500">
            Plese Supply All Details to Add to Gallery
          </p>
        </div>

        <GalleryForm
          input={newGalleryItem}
          handleOnchange={handleOnchange}
          setFile={(file: File) => setImageFile(file)}
        />

        <div className="grid grid-cols-2 gap-8">
          <Button
            onClick={() => {
              router.back();
            }}
            variant={"outline"}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleAddToGallery}
            className="w-full "
          >
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToGallery;
