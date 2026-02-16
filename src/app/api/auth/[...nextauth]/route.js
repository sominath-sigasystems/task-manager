import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";

/**
 * NextAuth configuration for multi-tenant authentication.
 *
 * - Resolves organization by slug
 * - Validates user credentials
 * - Verifies approved membership
 * - Injects tenant context into JWT
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
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        slug: {},
      },

      async authorize(credentials) {
        await dbConnect();

        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        const slug = credentials?.slug?.toLowerCase().trim();

        if (!email || !password || !slug) {
          throw new Error("Invalid login request");
        }

        // 1️⃣ Resolve organization
        const organization = await Organization.findOne({ slug }).lean();

        if (!organization) {
          throw new Error("Organization not found");
        }

        // 2️⃣ Validate user
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // 3️⃣ Verify membership
        const membership = await Membership.findOne({
          userId: user._id,
          organizationId: organization._id,
          status: "approved",
        }).lean();

        if (!membership) {
          throw new Error("Access denied for this organization");
        }

        // 4️⃣ Return tenant-bound identity
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          organizationId: organization._id.toString(),
          role: membership.role ?? "member",
        };
      },
    }),
  ],

  callbacks: {
    /**
     * Inject tenant context into JWT.
     */
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.organizationId = user.organizationId;
        token.role = user.role;
      }

      return token;
    },

    /**
     * Expose tenant context to client session.
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
