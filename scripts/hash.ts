import bcrypt from "bcrypt";

//パスワードからハッシュを作成
//npx tsx scripts/hash.ts
async function main() {
  const hash = await bcrypt.hash("xxx", 10);
  console.log(hash);
}
main();
