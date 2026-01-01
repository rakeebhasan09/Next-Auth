"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
	console.log(payload);
	// স্টেপ ১ - ব্যবহারকারী পূর্ব থেকেই ডাটাবেজ এ আছে কিনা তা চেক করা
	const isExist = await dbConnect("users").findOne({ email: payload.email });
	if (isExist) {
		return {
			success: false,
			message: "User Allready Existed.",
		};
	}

	// পাসওয়ার্ড হ্যাসকরণ
	const hashPassword = await bcrypt.hash(payload.password, 10);

	// স্টেপ -২ নতুন ব্যবহারকারী তৈরি করা
	const newUser = {
		...payload,
		createdAt: new Date().toISOString(),
		role: "user",
		password: hashPassword,
	};

	console.log(newUser);

	// স্টেপ -৩ ব্যবহারকারী ডাটাবেস এ পাঠানো

	const result = await dbConnect("users").insertOne(newUser);
	if (result.acknowledged) {
		return {
			success: true,
			message: `user created with ${result.insertedId.toString()}`,
		};
	}
};
