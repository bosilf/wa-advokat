import { defineField, defineType } from "sanity"

export const linkItem = defineType({
  name: "linkItem",
  title: "Länk",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Namn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "href",
      title: "Länk",
      type: "string",
      description: "Exempel: /kontakt eller https://linkedin.com/...",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "href",
    },
  },
})