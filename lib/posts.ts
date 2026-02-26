import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/diary");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostsBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return {
    slug: realSlug,
    content: fileContents,
  };
}
