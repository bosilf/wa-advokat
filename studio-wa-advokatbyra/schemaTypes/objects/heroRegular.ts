import { defineField, defineType } from "sanity";

export const heroRegular = defineType({
  name: "heroRegular",
  title: "Hero",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "Hero-bild",
      type: "image",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternativ text",
          type: "string",
          description: "Beskriv bildens innehåll för skärmläsare.",
          validation: (rule) => rule.required(),
        }),
      ],

      validation: (rule) => rule.required(),
    }),
  ],
});