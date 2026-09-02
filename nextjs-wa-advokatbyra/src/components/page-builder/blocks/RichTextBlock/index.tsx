import type { ComponentProps } from "react";

import { CustomPortableText } from "@/components/common/CustomPortableText";

type PortableTextValue = ComponentProps<
  typeof CustomPortableText
>["value"];

export type RichTextBlockData = {
  _key: string;
  _type: "richTextBlock";
  content?: PortableTextValue | null;
};

type RichTextBlockProps = {
  block: RichTextBlockData;
};

export default function RichTextBlock({
  block,
}: RichTextBlockProps) {
  if (!block.content) {
    return null;
  }

  return (
    <div className="font-body">
      <CustomPortableText value={block.content} />
    </div>
  );
}