"use client";
import NewsletterForm, { FieldTypes } from "@/components/newsletter-form/newsletter-form";
import Preview from "@/components/preivew/preview";
import withAuth from "@/HOC/with-auth";
import { domUtils } from "@/utils/dom";
import { Col, Form, FormProps, Row } from "antd";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [form] = Form.useForm();
	const [htmlCode, setHtmlCode] = useState("");

	const onFinish: FormProps['onFinish'] = async (values: FieldTypes) => {
		try {
			const fetchedHtmlCode = await fetchHtml();
	
			let cloneHtmlCode = fetchedHtmlCode; 
			
			if (values.jobGroup && values.jobGroup.length) {
				const listJobs = await domUtils.createListJobItems(values.jobGroup);
				cloneHtmlCode = domUtils.insertHtmlElementsAtComment(cloneHtmlCode, listJobs, "job list here");
			}
	
			if (values.content) {
				const contentElement = domUtils.createContentElement(values.content);
				cloneHtmlCode = domUtils.insertHtmlElementsAtComment(cloneHtmlCode, contentElement, "content here");
			}
	
			const leaderboardElement = await domUtils.createLeaderboardTable()
			cloneHtmlCode = domUtils.insertHtmlElementsAtComment(cloneHtmlCode, [leaderboardElement], "leaderboard here");
	
			setHtmlCode(cloneHtmlCode);
		} catch (error) {
			console.log("error: ", error);
		}
	}

	const fetchHtml = async () => {
		try {
			const response = await fetch("mail-template.html");
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const text = await response.text();
			setHtmlCode(text);
			return text; 
		} catch (error) {
			console.error('Failed to fetch HTML file:', error);
			return "";
		}
	};

	useEffect(() => {
		fetchHtml();
	}, [])

	return (
		<div className="h-screen p-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
			<Row className="h-full" gutter={[40, 0]}>
				<Col span={12} className="h-full overflow-auto border-r-2 border-blue-300 border-dashed">
					<NewsletterForm onFinish={onFinish} form={form}/>
				</Col>
				<Col span={12} className="h-full">
					<Preview htmlCode={htmlCode} />
				</Col>
			</Row>
		</div>
	);
}

export default withAuth(Home);