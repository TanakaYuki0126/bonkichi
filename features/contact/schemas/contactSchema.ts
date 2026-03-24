import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.email("メールアドレスが正しくありません"),
  message: z.string().min(5, "5文字以上入力してください"),
});
