import { defineField, defineType } from "sanity";

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Bild",
  type: "object",

  fields: [
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "caption",
      title: "Bildtext",
      type: "string",
    }),
  ],

  preview: {
    select: {
      media: "image",
      caption: "caption",
    },
    prepare({ media, caption }) {
      return {
        title: caption || "Bild",
        media,
      };
    },
  },
});