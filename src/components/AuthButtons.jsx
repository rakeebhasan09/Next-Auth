"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";
import { signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
	const session = useSession();
	return (
		<div>
			<div className="flex gap-5">
				{session.status == "authenticated" ? (
					<button className="btn" onClick={() => signOut()}>
						Log Out
					</button>
				) : (
					<>
						<LoginButton />
						<Link href={"/register"} className="btn">
							Register
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default AuthButtons;
