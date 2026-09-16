import { defineArrayMember, defineField, defineType } from "sanity"
import { CheckmarkCircleIcon } from "@sanity/icons";

import {
  BodyStyle,
  DisplayStyle,
  EyebrowStyle,
  H2Style,
  H3Style,
} from "../../components/PortableTextStyles";


export const blockObject = defineType({
  name: "blockObject",
  title: "Textblock",
  type: "object",

  fields: [
  
    defineField({
      name: "block",
      title: "Text",
      type: "array",
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {
              title: "Brödtext",
              value: "normal",
              component: BodyStyle
            },
            {
              title: "Stor rubrik – Display",
              value: "display",
              component: DisplayStyle
            },
            {
              title: "Rubrik – H2",
              value: "h2",
              component: H2Style
            },
            {
              title: "Underrubrik – H3",
              value: "h3",
              component: H3Style
            },
            {
              title: "Eyebrow",
              value: "eyebrow",
              component: EyebrowStyle
            },
            {
              title: "Citat",
              value: "blockquote",
            },
          ],
    
          lists: [
            {
              title: "Punktlista",
              value: "bullet",
            },
            {
              title: "Numrerad lista",
              value: "number",
            },
            {
              title: "Checklista",
              value: "check",
              icon: CheckmarkCircleIcon,
            },
          ],
        }),
        defineArrayMember({
          name: 'button',
          type: 'button'
        }),
      ],
    }),
  ],

  preview: {
    select: {
      block: "block",
    },

    prepare({ block }) {
      const text =
        block?.[0]?.children
          ?.map((child: { text?: string }) => child.text)
          .join("") || "Textblock"

      return {
        title: text,
      }
    },
  },
})