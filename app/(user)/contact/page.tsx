import ContactForm from "@/components/contact/ContactForm";
import PageTitle from "@/components/shared/PageTitle";

import { FC } from "react";

interface ContactUsProps {}
const ContactUs: FC<ContactUsProps> = () => {
  return (
    <div className="space-y-28">
      <div className=" hidden  bg-[url('/images/bg-deco.svg')] bg-cover bg-center absolute top-0 right-0 w-[60%] h-screen md:flex z-0" />
      <PageTitle title="Contact Us" />
      <div className="space-y-28 w-frame">
        <div className="lg:w-[60%] mx-auto space-y-8">
          <h3 className=" text-[2.4rem] lg:text-[4.8rem] text-center text-primary lg:leading-[6rem]">
            Get in Touch with Us
          </h3>
          <p className="text-[#667085] text-center text-[1.6rem] lg:text-2xl leading-[3rem]">
            We’re here to help! Reach out to us today, and let’s start the
            conversation about how we can support your child’s learning journey.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
