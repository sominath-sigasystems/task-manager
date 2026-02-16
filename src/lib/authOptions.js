import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/**
 * Centralized NextAuth configuration.
 *
 * - Uses JWT strategy
 * - Injects organizationId into token
 * - Validates credentials
 */
export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        organizationId: {}, // important for multi-tenant
      },

      async authorize(credentials) {
        await connectDB();

        const { email, password, organizationId } = credentials;

        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Multi-tenant validation
        if (!organizationId) {
          throw new Error("Organization not selected");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          organizationId, // injected into JWT
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.organizationId = user.organizationId;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.organizationId = token.organizationId;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
