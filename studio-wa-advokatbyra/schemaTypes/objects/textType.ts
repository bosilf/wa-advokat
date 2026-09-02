import { defineField, defineType } from "sanity"

export const textObject = defineType({
  name: "textObject",
  title: "Text",
  type: "object",

  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
  ],

  preview: {
    select: {
      title: "text",
    },
  },
})