import { checkRateLimit } from "@/lib/rate-limit";

export async function checkSpam({
  company,
  formStart,
  ip,
}: {
  company: FormDataEntryValue | null;
  formStart: number;
  ip: string;
}) {
  if (company) {
    return { success: false, message: "Spam detected" };
  }
  const allowed = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      message: "送信回数が多すぎます。時間を開けて再度お問い合わせください。",
    };
  }
  if (Date.now() - formStart < 3000) {
    return {
      success: false,
      message: "Too fast",
    };
  }
  return null;
}
