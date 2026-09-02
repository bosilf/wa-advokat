import { defineField, defineType } from "sanity";

export const cardContainer = defineType({
  name: "cardContainer",
  title: "Kort med accordion",
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
    }),

    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "eyebrow",
    }),

    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
    }),

    defineField({
      name: "accordionItems",
      title: "Accordion-rader",
      type: "array",
      of: [{ type: "accordionItem" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      items: "accordionItems",
    },

    prepare({ title, media, items }) {
      return {
        title: title || "Kort med accordion",
        subtitle: `${items?.length ?? 0} rader`,
        media,
      };
    },
  },
});