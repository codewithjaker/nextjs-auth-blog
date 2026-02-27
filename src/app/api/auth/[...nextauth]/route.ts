//@ts-nocheck
import NextAuth from "next-auth"; // ✅ THIS IS MISSING
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials?.email }).select(
          "+password",
        );
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password,
        );
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { maxAge: 15 * 60 }, // 15 minutes – access token lifetime
  pages: { signIn: "/login" }, // optional
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
