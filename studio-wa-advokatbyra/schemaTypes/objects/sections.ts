import { defineField, defineType } from "sanity"

export const sections = defineType({
  name: "sections",
  title: "Sektion",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      type: "eyebrow",
    }),

    defineField({
      name: "title",
      title: ' ',
      type: "titleObject",
    }),
    defineField({
        type: "blockObject",
        name: 'textObject',
        title: " "
    })
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
  },
})