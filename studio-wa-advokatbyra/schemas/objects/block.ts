import { defineField, defineType } from "sanity"

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
        {
          type: "block",
        },
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