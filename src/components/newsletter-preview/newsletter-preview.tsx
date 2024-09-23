import React, { useEffect, useRef } from "react";

interface Props {
	htmlCode: string;
}

export default function NewsLetterPreview({ htmlCode }: Props) {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		if (iframeRef.current) {
			const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlCode);
        doc.close();
      }
		}
	}, [htmlCode]);

	return (
		<iframe ref={iframeRef} className="w-full h-full overflow-y-auto" title="HTML Preview" />
	);
}
