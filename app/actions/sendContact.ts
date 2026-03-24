"use server";

import { contactSchema } from "@/features/contact/schemas/contactSchema";
import { getIp } from "@/features/contact/services/getIp";
import { saveContactService } from "@/features/contact/services/saveContactService";
import { sendMailService } from "@/features/contact/services/sendMailService";
import { checkSpam } from "@/features/contact/services/spamCheck";

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
  const formStart = Number(formData.get("formStart"));
  const ip = await getIp();
  const spamError = await checkSpam({ company, formStart, ip });
  if (spamError) {
    return spamError;
  }
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const rawData = { name, email, message };
  const result = contactSchema.safeParse(rawData);

  await saveContactService({ name, email, message, ip });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      rawData,
    };
  }
  await sendMailService({
    from: "ぼんきち <contact@mail.bonkichi.jp>",
    to: "tnkyk0126@gmail.com",
    subject: "お問い合わせがあります",
    replyTo: rawData.email,
    text: `Name: ${rawData.name}\nEmail: ${rawData.email}\nmessage:${rawData.message}`,
  });
  await sendMailService({
    from: "ぼんきち <contact@mail.bonkichi.jp>",
    to: rawData.email,
    subject: "お問い合わせありがとうございました",
    text: `${rawData.name}様\n\n\nこの度はお問い合わせいただきありがとうございます。\n内容確認後に返信いたします。\n\n\nお問い合わせ内容: \n${rawData.message}`,
  });
  return {
    success: true,
    message: "お問い合わせを送信しました",
  };
}
