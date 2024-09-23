import NewsLetterCodePreview from '@/components/newsletter-code-preview/newsletter-code-preview'
import NewsLetterPreview from '@/components/newsletter-preview/newsletter-preview'
import { Tabs } from 'antd'
import React from 'react'
import styles from "./preview.module.scss";
import { domUtils } from '@/utils/dom';

interface Props {
  htmlCode: string
}

export default function Preview({htmlCode}: Props) {
  return (
    <Tabs className={`${styles["preview"]} h-full`} centered items={[
      {
        label: "Html",
        key: "1",
        children: <NewsLetterPreview htmlCode={htmlCode}/>
      },
      {
        label: "Code",
        key: "2",
        children: <NewsLetterCodePreview htmlCode={domUtils.getBodyContent(htmlCode)}/>
      }
    ]}/>
  )
}
