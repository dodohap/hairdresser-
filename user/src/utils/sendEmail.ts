import { ServerError } from "../errors/ServerError";
import logger from "./logger";
import nodemailer from "nodemailer";

export async function sendEmail(email: string, subject: string, text: string, html: string = "") {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Kreacji i Nozyczki - Salon Fryzjerski" <${process.env.EMAIL_USER}>`, // Customizable sender
      to: email,
      subject,
      text,
      html: html || undefined, // Use HTML if provided
    };

    await transporter.sendMail(mailOptions);

    logger.info(`Email sent to: ${email}`);
  } catch (error) {
    logger.error(`Send email error: ${error}`, {
      email,
      subject,
      error: error,
    });

    throw new ServerError(500, "Server error! Please try again later.");
  }
}
