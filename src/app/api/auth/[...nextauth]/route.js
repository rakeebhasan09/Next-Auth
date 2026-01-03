import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// Sign in with {name} Button
			name: "Credentials",
			// form inputs
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "montu@mia.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Enter Your Password",
				},
			},
			async authorize(credentials, req) {
				// my own login logic
				const { email, password } = credentials;

				// const user = users.find((u) => u.name == username);
				const user = await dbConnect("users").findOne({ email });

				if (!user) return null;

				const isPasswordOk = await bcrypt.compare(
					password,
					user.password
				);

				if (isPasswordOk) {
					return user;
				}

				// Return null if user data could not be retrieved
				return null;
			},
		}),
		// ...add more providers here
	],

	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},
		async session({ session, token, user }) {
			if (token) {
				session.role = token.role;
			}
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.email = user.email;
				token.role = user.role;
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
