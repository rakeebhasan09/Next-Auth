import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
	{ name: "hablu", password: "1234" },
	{ name: "dablu", password: "5678" },
	{ name: "bablu", password: "9101" },
];

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// Sign in with {name} Button
			name: "Credentials",
			// form inputs
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
				secretCode: {
					label: "Secret Code",
					type: "number",
					placeholder: "Enter your secret code",
				},
			},
			async authorize(credentials, req) {
				// my own login logic
				const { username, password, secretCode } = credentials;

				const user = users.find((u) => u.name == username);
				if (!user) return null;

				const isPasswordOk = user.password == password;

				if (isPasswordOk) {
					return user;
				}

				// Return null if user data could not be retrieved
				return null;
			},
		}),
		// ...add more providers here
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
