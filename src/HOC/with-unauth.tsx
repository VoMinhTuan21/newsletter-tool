import { cookieUtils } from "@/utils/cookie";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withUnAuth = (Component: NextPage) => {
	return (props: any) => {
		const router = useRouter();
		const token = cookieUtils.getToken();

		useEffect(() => {
			if (token) {
				router.push("/");
			}
		}, []);

		return <Component {...props} />;
	};
};

export default withUnAuth;
