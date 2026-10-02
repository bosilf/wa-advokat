import { defineField, defineType } from "sanity";

export const eyebrow = defineType({
  name: "eyebrow",
  type: "object",

  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
    }),
    defineField({
      name: 'hasLink',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      hidden: ({ parent }) => !parent?.hasLink,
      name: 'link',
      type: "link",
    }),
  ],

  preview: {
    select: {
      title: "text",
      linkTitle: "link.pageName",
    },

    prepare({ title, linkTitle }) {
      return {
        title: title || "Namnlös eyebrow",
        subtitle: linkTitle
          ? `Länk: ${linkTitle}`
          : "Ingen länk",
      };
    },
  },
});