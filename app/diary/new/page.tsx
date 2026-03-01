import { redirect } from "next/navigation";
import Form from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/diary/new");
  }
  return <Form />;
}
