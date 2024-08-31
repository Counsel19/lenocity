import { NextRequest } from "next/server";
import crypto from "crypto";

import nodemailer from "nodemailer";
import AdminUser from "@/models/AdminUser";
import FORGOT_PASSWORD_HTML_TEMPLATE from "@/lib/forgotPasswordTemp";
import { connectDB } from "@/lib/mongoose";

export const POST = async (req: NextRequest) => {
  let existingUser;
  try {
    await connectDB();
    const { email } = await req.json();

    existingUser = await AdminUser.findOne({
      email,
    });
    if (!existingUser || !existingUser.name)
      return new Response("Email Does not Exists", { status: 400 });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 36000000;

    await AdminUser.updateOne(
      {
        _id: existingUser._id,
      },
      {
        resetToken: passwordResetToken,
        passwordResetExpires: passwordResetExpires,
      }
    );

    const resetUrl = `https://www.lenocity.vercel.app/reset-password/${resetToken}`;

    const { name } = existingUser;
    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });

    let mailData = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email, // list of receivers
      subject: "Reset Password Confirmation ✔", // Subject line
      html: FORGOT_PASSWORD_HTML_TEMPLATE({ name: name, url: resetUrl }), // html body
    });

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent successfully");
    });

    return new Response("Email Sent Sucess", {
      status: 200,
    });
  } catch (error) {
    // @ts-ignore
    if (existingUser) {
      await AdminUser.updateOne(
        {
          _id: existingUser._id,
        },
        {
          resetToken: null,
          passwordResetExpires: null,
        }
      );
    }

    const err = error as Error;
    return new Response(
      err?.message || "Could not get User Details, Please try again",
      {
        status: 500,
      }
    );
  }
};
