import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const pageSection = defineType({
  name: "pageSection",
  title: "Sektion",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "eyebrow",
    }),

    defineField({
      name: "heading",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "theme",
      title: "Bakgrund",
      type: "string",
      options: {
        list: [
          {
            title: "Ljus",
            value: "canvas",
          },
          {
            title: "Tonad",
            value: "surface",
          },
          {
            title: "Mörk",
            value: "dark",
          },
        ],
        layout: "radio",
      },
      initialValue: "canvas",
    }),

    defineField({
      name: "blocks",
      title: "Innehåll",
      type: "array",
      of: [
        defineArrayMember({
          type: "richTextBlock",
        }),
        defineArrayMember({
          type: "imageBlock",
        }),
        defineArrayMember({
          type: "buttonGroupBlock",
        }),
        defineArrayMember({
          type: "employeeGridBlock",
        }),
        defineArrayMember({
          type: "serviceGridBlock",
        }),
        defineArrayMember({
          type: "accordionBlock",
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      heading: "heading",
      blocks: "blocks",
    },
    prepare({ heading, blocks }) {
      const count = Array.isArray(blocks)
        ? blocks.length
        : 0;

      return {
        title: heading || "Namnlös sektion",
        subtitle: `${count} innehållsblock`,
      };
    },
  },
});