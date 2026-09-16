import { defineField, defineType } from "sanity";

export const accordionItem = defineType({
  name: "accordionItem",
  title: "Accordion",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required(),
    }),

  
        defineField({
          name: "description",
          title: "Innehåll",
          type: "richText",
        }),
        defineField({
          type: 'reference',
          name: 'list',
          to: [{ type: 'course'}]
        }),
        defineField({
          name: 'btnHref',
          type: 'button',
          title: 'Länk i Dragspelet?'
        }),
        

  ],

  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Namnlös accordion-rad",
      };
    },
  },
});