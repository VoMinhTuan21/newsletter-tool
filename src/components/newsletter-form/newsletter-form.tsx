import { Form, Input, Button, FormInstance, FormProps } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("@/components/text-editor/text-editor"), {ssr: false});

export interface FieldTypes {
	content?: string;
	jobGroup: [{
		name: string;
		list: [{ link: string }]
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
						list: []
					},
					{
						name: "high level",
						list: []
					},
					{
						name: "mass",
						list: []
					},
				] }}
				layout="vertical"
			>
				<Form.List name="jobGroup">
					{(fields, { add, remove }) => (
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

									{/* Nest Form.List */}
									<Form.Item label="List">
										<Form.List name={[field.name, "list"]}>
											{(subFields, subOpt) => (
												<div className="flex flex-col gap-y-4">
													{subFields.map((subField) => (
														<div className="flex gap-3" key={subField.key}>
															<Form.Item key={subField.key} noStyle name={[subField.name, "link"]}>
																<Input placeholder="https://abcd.com" />
															</Form.Item>
															<CloseOutlined
																onClick={() => {
																	subOpt.remove(subField.name);
																}}
															/>
														</div>
													))}
													<Button type="dashed" onClick={() => subOpt.add()} block>
														+ Add Sub Item
													</Button>
												</div>
											)}
										</Form.List>
									</Form.Item>
								</div>
							))}

							<Button type="dashed" onClick={() => add()} block>
								+ Add Item
							</Button>
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

				{/* <Form.Item noStyle shouldUpdate>
							{() => (
								<Typography>
									<pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
								</Typography>
							)}
						</Form.Item> */}
			</Form>
		</div>
	);
}
