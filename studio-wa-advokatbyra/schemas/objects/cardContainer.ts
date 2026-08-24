import { defineField, defineType } from 'sanity'

export const cardContainer = defineType({
  name: "cardContainer",
  title: "Kort",
  type: "object",

  fields: [
    defineField({
      name: "imageContent",
      title: "Bildinnehåll",
      type: "object",

      fields: [
        defineField({
          name: "image",
          title: "Bild",
          type: "image",
        }),

        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
    }),
  ],
})