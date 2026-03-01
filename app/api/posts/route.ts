import { db } from "@/lib/db";
import { posts } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.slug || !body.content) {
      return new Response("Missing required fields", { status: 400 });
    }

    const result = await db
      .insert(posts)
      .values({
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: "draft",
      })
      .returning();

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("internal Server Error", { status: 500 });
  }
}
