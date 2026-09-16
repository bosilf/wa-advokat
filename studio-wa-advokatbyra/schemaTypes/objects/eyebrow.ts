import { defineField, defineType } from "sanity";

export const eyebrow = defineType({
  name: "eyebrow",
  type: "object",

  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "link",
      title: "Länk",
      type: "reference",
      to: [{ type: "link" }],
      description: "Valfritt. Lämna tomt om eyebrow inte ska vara en länk.",
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