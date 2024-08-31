import { NextRequest } from "next/server";
import HTML_TEMPLATE from "@/lib/emailTemp";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  try {
  
    const { email, name, message, subject } =
      await req.json();

    if (!email || !name || !message || !subject)
      return new Response("Invalid Input", { status: 400 });

    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailData = await transporter.sendMail({
      from: process.env.EMAIL,
      to: "lenocitypage@gmail.com",  // list of receivers
      subject: subject, // Subject line
      html: HTML_TEMPLATE({
        name: name,
        email: email,
        message: message,
        subjectLine: subject,
      }), // html body
    });

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent successfully");
    });

    return new Response(JSON.stringify({ message: "Email Sent Sucess" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error, "error");
    return new Response("Could Send Email, Please try Again", {
      status: 500,
    });
  }
};
