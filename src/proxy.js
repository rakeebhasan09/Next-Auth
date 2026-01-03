import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/private", "/dashboard", "/secret"];
const adminRoutes = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
	const token = await getToken({ req });
	const reqPath = req.nextUrl.pathname;
	const isAuthenticated = Boolean(token);
	const isUser = token?.role === "user";
	const isAdmin = token?.role === "admin";
	const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));
	const isAdminRoute = adminRoutes.some((route) => reqPath.startsWith(route));

	// Logic for private routes only
	if (!isAuthenticated && isPrivate) {
		const loginURL = new URL("/api/auth/signin", req.url);
		loginURL.searchParams.set("callbackUrl", reqPath);
		return NextResponse.redirect(loginURL);
	}

	// Logic For Admin Routes Only
	if (isAuthenticated && !isAdmin && isAdminRoute) {
		return NextResponse.rewrite(new URL("/forbidden", req.url));
	}

	console.log({ isAuthenticated, isUser, reqPath, isPrivate });
	// return NextResponse.redirect(new URL("/", req.url));
	return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
	matcher: ["/private/:path*", "/dashboard/:path*", "/secret/:path*"],
};
