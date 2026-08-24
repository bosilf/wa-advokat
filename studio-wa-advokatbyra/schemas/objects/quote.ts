import { defineField, defineType } from "sanity"

export const quoteObject = defineType({
  name: "quoteObject",
  title: "Citat",
  type: "object",

  fields: [
    defineField({
      name: "participantName",
      title: "Namn",
      type: "string",
    }),
    defineField({
      name: "participantQuote",
      title: "Citat",
      type: "text",
    }),
    defineField({
      name: "participantCourse",
      title: "Kurs/Utbildning",
      type: "reference",
      to: [{type: 'courses'}]
    }),
  ],

  preview: {
    select: {
      title: "participantName",
      subitle: "participantCourse"
    },
  },
})