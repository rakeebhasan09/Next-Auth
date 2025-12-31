import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

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
			},
			async authorize(credentials, req) {
				// my own login logic

				// Return null if user data could not be retrieved
				return null;
			},
		}),
		// ...add more providers here
	],
};

export default NextAuth(authOptions);
