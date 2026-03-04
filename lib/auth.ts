import bcrypt from "bcrypt";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null;
        if (!credentials?.email || !credentials?.password) return null;
        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);
        const user = result[0];
        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
