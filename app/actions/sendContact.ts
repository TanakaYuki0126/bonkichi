"use server";

import { contactSchema } from "../contact/schema";
import { Resend } from "resend";
import { getIp } from "./getIp";
import { checkRateLimit } from "@/lib/rate-limit";
import { db } from "@/lib/db";
import { contacts } from "@/lib/schema";

const resend = new Resend(process.env.RESEND_API_KEY);
export type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  rawData?: {
    name?: string;
    email?: string;
    message?: string;
  };
  success?: boolean;
  message?: string;
};

export async function sendContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const company = formData.get("company");
  if (company) {
    return { success: false, message: "Spam detected" };
  }
  const ip = await getIp();
  const allowed = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      message: "送信回数が多すぎます。時間を開けて再度お問い合わせください。",
    };
  }
  const formStart = Number(formData.get("formStart"));
  if (Date.now() - formStart < 3000) {
    return {
      success: false,
      message: "Too fast",
    };
  }
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const rawData = { name, email, message };
  const result = contactSchema.safeParse(rawData);

  await db.insert(contacts).values({
    name,
    email,
    message,
    ip,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      rawData,
    };
  }
  await resend.emails.send({
    from: "ぼんきち <contact@mail.bonkichi.jp>",
    to: "tnkyk0126@gmail.com",
    subject: "お問い合わせがあります",
    replyTo: rawData.email,
    text: `Name: ${rawData.name}\nEmail: ${rawData.email}\nmessage:${rawData.message}`,
  });
  return {
    success: true,
    message: "お問い合わせを送信しました",
  };
}
