import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const role = defineType({
  name: "role",
  title: "Yrkestitlar",
  type: "document",
  icon: TagIcon,

  fields: [
    defineField({
      name: "title",
      title: "Yrkestitel",
      type: "string",
      description:
        'Exempel: "Advokat", "Biträdande jurist" eller "Partner".',

      validation: (rule) =>
        rule.required().min(2).max(80),
    }),

    // defineField({
    //   name: "slug",
    //   title: "Webbadress",
    //   type: "slug",
    //   description:
    //     'Klicka på "Generate" för att skapa adressen till yrkestitelns sida.',

    //   options: {
    //     source: "title",
    //     maxLength: 96,
    //   },

    //   validation: (rule) => rule.required(),
    // }),

    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 3,
      description:
        "Valfritt. Kan visas på sidan som listar medarbetare med den här yrkestiteln.",

      validation: (rule) => rule.max(300),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description:
        "Behövs bara om yrkestiteln har en egen publik sida.",
    }),
  ],

  orderings: [
    {
      title: "Manuell ordning",
      name: "sortOrderAsc",
      by: [
        {
          field: "sortOrder",
          direction: "asc",
        },
      ],
    },

    {
      title: "Yrkestitel A–Ö",
      name: "titleAsc",
      by: [
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});