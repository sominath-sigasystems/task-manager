import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Membership from "@/models/Membership";

/**
 * Centralized NextAuth configuration for App Router.
 */
export const authOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const email = credentials.email.toLowerCase().trim();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * Persist custom fields inside JWT
     */
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;

        await dbConnect();

        const membership = await Membership.findOne({
          userId: user.id,
          status: "approved",
        }).lean();

        token.organizationId = membership?.organizationId?.toString() ?? null;

        token.role = membership?.role ?? null;
      }

      return token;
    },

    /**
     * Expose JWT fields to session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.organizationId = token.organizationId;
        session.user.role = token.role;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
