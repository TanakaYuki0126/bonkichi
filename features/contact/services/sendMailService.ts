import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendMailService({
  from,
  to,
  subject,
  replyTo,
  text,
}: {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  text: string;
}) {
  await resend.emails.send({ from, to, subject, replyTo, text });
}
