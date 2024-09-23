import { authAPI } from "@/service/api/auth";
import { cookieUtils } from "@/utils/cookie";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = <P extends object>(Component: NextPage) => {
	const ComponentWithAuth: NextPage<P> = (props) => {
		const router = useRouter();
		const token = cookieUtils.getToken();

		const handleRefreshToken = async () => {
			try {
				const authResponse = await authAPI.refreshToken(token);
				cookieUtils.setToken(authResponse.data.token);
			} catch {
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

	return ComponentWithAuth;
};

export default withAuth;
