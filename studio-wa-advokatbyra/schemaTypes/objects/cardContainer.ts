import { defineField, defineType } from "sanity";

export const cardContainer = defineType({
  name: "cardContainer",
  title: "Kort med accordion",
  type: "object",

  fields: [
    defineField({
      type: 'boolean',
      name: 'hasImage',
      title: 'Har Bild',
      initialValue: false
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
    
      hidden: ({parent}) => !parent?.hasImage,

      options: {
        hotspot: true,
      },
    
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
        }),
      ],
    
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {
            hasImage?: boolean;
          };
    
          const image = value as
            | {
                asset?: {
                  _ref?: string;
                };
                alt?: string;
              }
            | undefined;
    
          if (!parent?.hasImage) {
            return true;
          }
    
          if (!image?.asset?._ref) {
            return "Välj en bild.";
          }
    
          if (!image.alt?.trim()) {
            return "Skriv en alternativtext till bilden.";
          }
    
          return true;
        }),
    }),

    defineField({
      hidden: ({parent}) => !parent?.hasImage,
      name: "eyebrow",
      title: "Bild eyebrow",
      type: "string",
    }),

    defineField({
      hidden: ({parent}) => !parent?.hasImage,
      name: "title",
      title: "Bild rubrik",
      type: "string",
    }),
    
    defineField({
      type: 'boolean',
      name: 'hasDescription',
      title: 'Har Beskrivning',
      initialValue: false
    }),
    defineField({
      hidden: ({parent}) => !parent?.hasDescription,
      name: "description",
      title: "Beskrivning",
      type: "text",
      validation: (rule) => 
        rule.custom((value, context) => {
          const parent = context.parent as {
            hasDescription?: boolean
          }

          if (!parent?.hasDescription) {
            return true
          }

          if (
            typeof value !== "string" ||
            !value.trim()
          ) {
            return "Skriv en bildbeskrivning.";
          }
          return true
        })
    }),

    defineField({
      name: 'hasAccordion',
      type: 'boolean',
      initialValue: false,
      title: 'Har Dragspel'
    }),

    defineField({
      hidden: ({parent}) => !parent?.hasAccordion,
      name: "accordionItems",
      title: "Accordion-rader",
      type: "array",
      of: [
        { type: 'reference', 
          to: [
            { type: 'course', },
            { type: 'courseCategory' },
            { type: 'employee'},
            { type: 'article'},
          ]
        },
        { type: "accordionItem" }
      ],
      validation: (rule) => 
        rule.custom((value, context) => {
          const parent = context.parent as {
            hasAccordion?: boolean
          }

          if (!parent?.hasAccordion) {
            return true
          }

          if (!Array.isArray(value) || value.length === 0) {
            return "Lägg till minst en accordion-rad"
          }
          return true
        }),
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