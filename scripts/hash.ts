import bcrypt from "bcrypt";

async function main() {
  const hash = await bcrypt.hash("knrndrkm", 10);
  console.log(hash);
}
main();
