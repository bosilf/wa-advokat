import { defineField, defineType } from "sanity"

export const accordions = defineType({
  name: "accordions",
  title: "Dragspel",
  type: "document",

  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Namn på dragspelet',
    },
    {
      name: "card",
      title: 'Dragspel',
      type: "cardContainer",
    },

    defineField({
      name: "items",
      title: "Innehåll",
      type: "array",
      of: [
        {
          type: "accordion",
        },
      ],

      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    select: {
      title: "title",
      items: "items",
    },

    prepare({ title, items }) {
      return {
        title: title || "Namnlöst dragspel",
        subtitle: `${items?.length ?? 0} sektioner`,
      }
    },
  },
})