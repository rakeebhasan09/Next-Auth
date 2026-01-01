"use client";
import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
	return (
		<button className="btn" onClick={() => signIn()}>
			Login Now
		</button>
	);
};

export default LoginButton;
