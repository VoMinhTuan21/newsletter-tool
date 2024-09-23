import { Popover } from "antd";
import * as parserHtml from "prettier/parser-html";
import * as prettier from "prettier/standalone";
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyOutlined } from "@ant-design/icons"
interface Props {
  htmlCode: string;
}

export default function NewsLetterCodePreview({htmlCode}: Props) {
  const [formattedCode, setFormattedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const replacements: {[index: string] : string} = {
    '&quot;': '\'',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    // Add more replacements as needed
  };

  const handleCopy = () => {
    setCopied(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedCode);
    }
  }

  useEffect(() => {
    prettier.format(htmlCode.replace(/&[a-zA-Z0-9#]+;/g, (match) => replacements[match] || match), {
      parser: "html",
      plugins: [parserHtml],
      bracketSameLine: true,
      printWidth: 120
    }).then(data => {
      setFormattedCode(data);
    })
  }, [htmlCode, replacements]);

  useEffect(() => {
    let timeout = undefined;
    if(copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [copied])
  
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute top-4 right-4">
        <Popover placement="left" content={copied ? "copied!" : "copy to clipboard"}>
          <CopyOutlined onClick={handleCopy}/>
        </Popover>
      </div>
      <div className="h-full overflow-auto">
        <SyntaxHighlighter customStyle={{width: "fit-content", overflowX: "unset"}} language="markup" style={docco}>
          {formattedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
