"use client";

import { FC, useState } from "react";
import { AxiosError } from "axios";
import { IContactInfo, sendContactMsg } from "@/services/contactService";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const initailInfo = {
  email: "",
  message: "",
  name: "",
  subject: "",
};

interface ContactFormProps {}
const ContactForm: FC<ContactFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState<IContactInfo>(initailInfo);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setMessageInput({ ...messageInput, [name]: value });
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !messageInput.email ||
      !messageInput.name ||
      !messageInput.subject ||
      !messageInput.message
    ) {
      return toast({
        title: "Invalid Input",
        description: "Please Enter All Fields",
        variant: "destructive",
      });
    }
    setIsLoading(true);

    try {
      await sendContactMsg(messageInput);

      toast({
        title: "Message sent Successfully",
        description:
          "Thank You for reaching out, we will get back to you shortly",
      });
      setMessageInput(initailInfo);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Sending Message",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Sending Message",
        description: "Something went wrong",
        variant: "success",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br p-8 lg:p-20 from-orange-50 to-orange-200 flex justify-between items-center shadow-xl">
      <div className="mx-auto w-full lg:w-2/5 space-y-20">
        <h5 className="text-3xl font-medium text-center ">
          Feel free to Reach out
        </h5>

        <form onSubmit={handleSendMessage} className="space-y-10">
          <div className="space-y-4">
            <label className="text-base" htmlFor="">
              Name
            </label>
            <Input
              name="name"
              value={messageInput.name}
              onChange={handleOnchange}
              className="bg-white"
              placeholder="Vera  James"
            />
          </div>
          <div className="space-y-4">
            <label className="text-base" htmlFor="">
              Email
            </label>
            <Input
              name="email"
              value={messageInput.email}
              onChange={handleOnchange}
              className="bg-white"
              type="email"
              placeholder="yourname@mail.com"
            />
          </div>
          <div className="space-y-4">
            <label className="text-base" htmlFor="">
              Subject
            </label>
            <Input
              name="subject"
              value={messageInput.subject}
              onChange={handleOnchange}
              className="bg-white"
              placeholder="The Subject"
            />
          </div>
          <div className="space-y-4">
            <label className="text-base" htmlFor="">
              Message
            </label>
            <Textarea
              name="message"
              value={messageInput.message}
              onChange={handleOnchange}
              placeholder="Enter Message "
            />
          </div>

          <Button isLoading={isLoading} className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
