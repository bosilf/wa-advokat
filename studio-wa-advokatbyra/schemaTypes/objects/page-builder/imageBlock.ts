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
      name: 'title',
      type: 'string'
    }),
    defineField({
      name: 'eyebrow',
      type: 'string'
    }),
    defineField({
      name: 'text',
      type: 'blockObject'
    })
  ],

  preview: {
    select: {
      media: "image",
      title: "title",
    },
    prepare({ media, title }) {
      return {
        title: title || "Bild",
        media,
      };
    },
  },
});