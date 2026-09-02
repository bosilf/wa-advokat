import { defineArrayMember, defineField, defineType } from "sanity";

export const accordionItem = defineType({
  name: "accordionItem",
  title: "Accordion-rad",
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
      type: "array",
      of: [
        defineArrayMember({
          type: 'block'
        }),
        defineArrayMember({
          type: 'button'
        })
      ]
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