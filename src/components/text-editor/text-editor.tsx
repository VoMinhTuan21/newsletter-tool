import TextArea from "antd/es/input/TextArea";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ align: ["right", "center", "justify"] }],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"code",
  "image"
];

interface OnChangeHandler {
	(e: any): void;
}

type Props = {
	value: string;
	placeholder: string;
	onChange: OnChangeHandler;
};

export default function TextEditor({ value, onChange, placeholder }: Props) {
  if (!document) return <TextArea/>
	return (
		<ReactQuill
			theme="snow"
			value={value || ""}
			modules={modules}
			formats={formats}
			onChange={onChange}

			placeholder={placeholder}
		/>
	);
}
