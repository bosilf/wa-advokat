import { defineField, defineType } from "sanity"

export const section = defineType({
  name: "section",
  title: "Section",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "content",
      title: "Lägg till innehåll",
      type: "array",
      of: [
        { type: "textObject" },
        { type: "button" },
        { type: "cardContainer" },

        // { type: "teamMemberCards" },
        { type: "image" },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
  },
})