import { BookIcon, LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const courseCategory = defineType({
  name: "courseCategory",
  title: "Utbildningskategorier",
  type: "document",
  icon: BookIcon,

  groups: [
    {
      name: "content",
      title: "Innehåll",
      default: true,
    },
    {
      name: "appearance",
      title: "Utseende",
    },
    {
      name: "settings",
      title: "Inställningar",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fieldsets: [
    {
      name: "basicInformation",
      title: "Grundinformation",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "texts",
      title: "Texter",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Kategorinamn",
      type: "string",
      group: "content",
      fieldset: "basicInformation",
      validation: (rule) =>
        rule.required().min(3).max(100),
    }),
    defineField({
      name: "link",
      title: "Länk till kurskategorin",
      group: "content",
      description:
        'Klicka på "Generate" för att skapa länken till kursen.',
      type: "link",
      icon: LinkIcon,
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: "slug",
    //   title: "Webbadress",
    //   type: "slug",
    //   group: "content",
    //   fieldset: "basicInformation",
    //   options: {
    //     source: "title",
    //     maxLength: 96,
    //   },
    //   validation: (rule) => rule.required(),
    // }),

    defineField({
      name: "excerpt",
      title: "Kort beskrivning",
      type: "text",
      rows: 3,
      group: "content",
      fieldset: "texts",
      validation: (rule) =>
        rule.required().min(40).max(220),
    }),

    defineField({
      name: "description",
      title: "Längre beskrivning",
      type: "array",
      group: "content",
      fieldset: "texts",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "image",
      title: "Kategoribild",
      type: "image",
      group: "appearance",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "theme",
      title: "Färgtema",
      type: "string",
      group: "appearance",
      options: {
        layout: "radio",
        list: [
          { title: "Blå", value: "blue" },
          { title: "Grön", value: "green" },
          { title: "Ljus", value: "light" },
          { title: "Mörk", value: "dark" },
          { title: "Neutral", value: "neutral" },
        ],
      },
      initialValue: "neutral",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "sortOrder",
      title: "Sorteringsordning",
      type: "number",
      group: "settings",
      initialValue: 100,
      validation: (rule) =>
        rule.required().integer().min(0),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
});