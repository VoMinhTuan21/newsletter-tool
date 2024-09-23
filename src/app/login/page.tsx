"use client";
import React from "react";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import Password from "antd/es/input/Password";
import Form, { FormProps } from "antd/es/form";
import Button from "antd/es/button";
import Title from "antd/es/typography/Title";
import { authAPI } from "@/service/api/auth";
import { cookieUtils } from "@/utils/cookie";
import withUnAuth from "@/HOC/with-unauth";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
	const router = useRouter();

	type FieldType = {
		email: string;
		password: string;
	};

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		authAPI
			.login(values)
			.then((data) => {
				return data.data;
			})
			.then((data) => {
				cookieUtils.setToken(data.token);
				router.push("/");
			});
	};

	return (
		<div className="flex items-center justify-center w-full h-screen">
			<div className="p-5 shadow-md rounded-xl w-96">
				<Title level={3} className="text-center">
					Login
				</Title>
				<Form onFinish={onFinish} layout="vertical">
					<FormItem<FieldType>
						label="Email"
						name="email"
						rules={[{ required: true, message: "Please input your email!" }]}
					>
						<Input />
					</FormItem>
					<FormItem<FieldType>
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Password />
					</FormItem>
					<FormItem className="mt-3">
						<Button block type="primary" htmlType="submit">
							Submit
						</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	);
}

export default withUnAuth(Login);