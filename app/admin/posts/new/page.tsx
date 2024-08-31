"use client";

import { FC, useState } from "react";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Formik, Form, FormikHelpers } from "formik";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { createBlogPost } from "@/lib/redux/slices/news/newsThunk";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomToolbar } from "@/components/news/molecules/CustomToolbar";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


interface NewBlogPostProps {}
const NewBlogPost: FC<NewBlogPostProps> = () => {
  const [loading, setLoading] = useState(false);
  const formValidationSchema = Yup.object().shape({
    title: Yup.string().required("News Post Title is Required"),
    imageDoc: Yup.mixed().required("News Post Image is required"),
    body: Yup.mixed().required("Blog Body is Required"),
  });

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const submitForm = async (
    values: {
      title: string;
      imageDoc: string;
      body: string;
    },
    actions: FormikHelpers<{
      title: string;
      imageDoc: string;
      body: string;
    }>
  ) => {
    try {
      setLoading(true);

      const imageData = new FormData();
      imageData.append("file", values.imageDoc);
      imageData.append("upload_preset", "lenocity_repo");
      const imageResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        imageData
      );

      const { url: imageUrl } = imageResponse.data;
      const payload = {
        title: values.title,
        body: values.body,
        image: imageUrl as string,
      };

      const res = await dispatch(createBlogPost(payload));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      toast({
        title: "Blog Post created Successfully",
      });

      actions.resetForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Creating Post",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Creating Post",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 md:p-8 flex flex-col gap-12 bg-white">
      <Button className="w-fit" onClick={() => router.back()} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-6">
        <h4 className="text-black text-xl font-semibold">Create News</h4>
        <p className="text-base text-slate-500">
          Please Supply All Details to Create News Post
        </p>
      </div>
      <div className="flex items-center ">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-col gap-6  border border-solid p-8">
            {" "}
            {/* h-[670px] */}
            <div className="h-auto">
              <Formik
                initialValues={{
                  title: "",
                  imageDoc: "",
                  body: "",
                }}
                validationSchema={formValidationSchema}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  // window.scrollTo(0, 0)

                  submitForm(values, actions);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,

                  setFieldValue,
                  errors,
                  touched,
                  // setFieldTouched,
                  values,
                }) => (
                  <Form onSubmit={handleSubmit} className="flex flex-col ">
                    <div className="flex flex-col gap-12 ">
                      <div className="flex flex-col gap-4">
                        <label
                          htmlFor="title"
                          className="text-base text-left font-semibold text-[#000000]"
                        >
                          Title
                        </label>
                        <Input
                          name="title"
                          placeholder="News Post Title"
                          type="text"
                          value={values.title}
                          onChange={handleChange}
                        />
                        {errors.title && touched.title ? (
                          <div className="text-RED-_100">{errors.title}</div>
                        ) : null}
                      </div>

                      <div className="flex flex-col xs:mt-4 lg:mt-0 ">
                        {values?.imageDoc ? (
                          <div className="pt-0 w-[300px] overflow-hidden ">
                            <Image
                              alt="upload"
                              width={300}
                              height={100}
                              src={values?.imageDoc}
                            />
                          </div>
                        ) : (
                          <label className="flex flex-col xs:w-full  h-56 py-4 px-0  border-2 bg-BLUE-_300 border-BLUE-_200 border-dashed">
                            <div className="flex flex-col my-auto items-center">
                              <CloudUpload />
                              <div className="text-center font-medium text-md text-black">
                                Click to upload{" "}
                                <span className="block text-black">
                                  PNG or JPG (max 5mb)
                                </span>
                              </div>
                            </div>
                            <input
                              type="file"
                              name="imageDoc"
                              value={values.imageDoc ? values.imageDoc : ""}
                              className="opacity-0"
                              onChange={(e) => {
                                const file =
                                  e.target.files && e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setFieldValue("imageDoc", reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              id="upload"
                              accept={"image/*"}
                              multiple={false}
                            />
                          </label>
                        )}
                        {errors.imageDoc && touched.imageDoc ? (
                          <div className="text-RED-_100">{errors.imageDoc}</div>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-4 ">
                        <label
                          htmlFor="title"
                          className="text-base text-left font-semibold text-[#000000]"
                        >
                          Body
                        </label>
                        <CustomToolbar />
                        <ReactQuill
                          theme="snow"
                          value={values.body}
                          onChange={(e) => setFieldValue("body", e)}
                          modules={modules}
                          formats={formats}
                          style={{
                            backgroundColor: "#fff",
                            minHeight: "500px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "10px",
                          }}
                          className=" h-[193px] mt-1.5 outline-none"
                        />

                        {errors.body && touched.body ? (
                          <div className="text-RED-_100">{errors.body}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center">
                      <Button type="submit" isLoading={loading}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

export default NewBlogPost;
