import { cookieUtils } from "@/utils/cookie";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withUnAuth = <P extends object>(Component: NextPage) => {
	const ComponentWithUnAuth: NextPage<P> = (props) => {
		const router = useRouter();
		const token = cookieUtils.getToken();

		useEffect(() => {
			if (token) {
				router.push("/");
			}
		}, []);

		return <Component {...props} />;
	};

	return ComponentWithUnAuth;
};

export default withUnAuth;
