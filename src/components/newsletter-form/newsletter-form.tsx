import { Form, Input, Button, FormInstance, FormProps } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("@/components/text-editor/text-editor"), {ssr: false});
const { TextArea } = Input;

export interface FieldTypes {
	content?: string;
	jobGroup: [{
		name: string;
		list: string;
	}]
}

interface Props {
	form: FormInstance<FieldTypes>;
	onFinish: FormProps<FieldTypes>["onFinish"];
}

export default function NewsletterForm({ form, onFinish }: Props) {
	return (
		<div>
			<Form
				labelCol={{ span: 3 }}
				form={form}
				onFinish={onFinish}
				name="dynamic_form_complex"
				style={{ maxWidth: 600 }}
				autoComplete="off"
				initialValues={{ jobGroup: [
					{
						name: "non it",
						list: ""
					},
					{
						name: "high level",
						list: ""
					},
					{
						name: "mass",
						list: ""
					},
				] }}
				layout="vertical"
			>
				<Form.List name="jobGroup">
					{(fields, { remove }) => (
						<div className="flex flex-col gap-y-4">
							{fields.map((field, index) => (
								<div key={field.key}>
									<div className="flex items-center justify-between">
										<label className="mb-1">Job list {index + 1}</label>
										<CloseOutlined
											onClick={() => {
												remove(field.name);
											}}
										/>
									</div>
									<Form.Item label="Name" name={[field.name, "name"]}>
										<Input />
									</Form.Item>
									<Form.Item label="List" name={[field.name, "list"]}>
										<TextArea placeholder="Autosize height based on content lines" autoSize />
									</Form.Item>
								</div>
							))}
						</div>
					)}
				</Form.List>
				<div className="mt-6"></div>
				<Form.Item label="Content" name="content">
					{/* @ts-expect-error: missing prop values */}
					<TextEditor />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Convert
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
