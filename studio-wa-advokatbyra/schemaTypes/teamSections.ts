import { defineField, defineType } from "sanity"

export const teamSection = defineType({
  name: "teamSection",
  title: "Team Section",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),

    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],
        },
      ],
    }),

    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "button" }],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
  },
})