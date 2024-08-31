import { FC } from "react";

import { IAddGallery, IGallery } from "@/types/gallery";
import LabledInput from "../shared/LabledInput";
import FileUpload from "../shared/FileUpload";
import Image from "next/image";

interface GalleryFormProps {
  setFile?: (file: File) => void;
  input: IGallery | IAddGallery;
  handleOnchange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const GalleryForm: FC<GalleryFormProps> = ({
  setFile,
  input,
  handleOnchange,
}) => {
  return (
    <div className="space-y-12">
      {setFile ? (
        <FileUpload setFile={setFile} />
      ) : (
        <Image
          width={500}
          height={500}
          src={input.image as string}
          alt={input.title}
        />
      )}

      <LabledInput
        label="Title"
        name="title"
        setInputValue={handleOnchange}
        value={input.title}
        placeholder="Item Title"
      />
    </div>
  );
};

export default GalleryForm;
