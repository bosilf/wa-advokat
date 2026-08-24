import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: "shortDescription",
      title: "Kort beskrivning",
      description: "50–90 tecken. Används i kort och kompakta listor.",
      type: "text",
      rows: 2,
      validation: (Rule) =>
        Rule.required().min(50).max(90),
    }),
    
    defineField({
      name: "summary",
      title: "Sammanfattning",
      description: "140–180 tecken. Sammanfatta tydligt och naturligt.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required().min(140).max(180),
    }),
    
    defineField({
      name: "extendedDescription",
      title: "Utökad beskrivning",
      description: "300–500 tecken. Beskriv vad det handlar om och vem den är relevant för.",
      type: "text",
      rows: 5,
      validation: (Rule) =>
        Rule.required().min(300).max(500),
    }),
  ]
}) 