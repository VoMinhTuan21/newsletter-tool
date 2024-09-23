import { authAPI } from "@/service/api/auth";
import { cookieUtils } from "@/utils/cookie";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = (Component: NextPage) => {
	return (props: any) => {
		const router = useRouter();
		const token = cookieUtils.getToken();

		const handleRefreshToken = async () => {
			try {
				const authResponse = await authAPI.refreshToken(token);
				cookieUtils.setToken(authResponse.data.token);
			} catch (error) {
				router.push("/login");
			}
		};

		useEffect(() => {
			if (!token) {
				router.push("/login");
			} else {
        handleRefreshToken();
      }
		}, []);

		return <Component {...props} />;
	};
};

export default withAuth;
