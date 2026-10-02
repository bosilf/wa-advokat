import { defineField, defineType } from "sanity";

export const filterLinks = defineType({
  name: "filterLinks",
  type: "object",

  fields: [
    defineField({
      name: "destinationType",
      title: "Typ av sida",
      type: "string",
      options: {
        layout: "dropdown",
        list: [
          { title: "Kurs", value: "course" },
          { title: "Medarbetare", value: "employee" },
          { title: "Rättsområde", value: "service" },
          { title: "Kurskategori", value: "courseCategory" },
          { title: "Artikel", value: "article" },
          { title: "Om oss", value: "aboutPage" },
          { title: "Kontakt", value: "contactPage" },
          { title: "Boka kurs", value: "bookCoursePage" },
          { title: "Artiklar", value: "articleMainPage" },
          { title: "Juridikkurser", value: "courseMainPage" },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",

      to: [
        { type: "course" },
        { type: "employee" },
        { type: "service" },
        { type: "courseCategory" },
        { type: "article" },
        { type: "aboutPage" },
        { type: "contactPage" },
        { type: "bookCoursePage" },
        { type: "articleMainPage" },
        { type: "courseMainPage" },
      ],

      options: {
        filter: ({ parent }) => {
          const destinationType = (
            parent as {
              destinationType?: string;
            }
          )?.destinationType;

          if (!destinationType) {
            return {};
          }

          return {
            filter: "_type == $destinationType",
            params: {
              destinationType,
            },
          };
        },
      },

      hidden: ({ parent }) =>
        !parent?.destinationType,

      validation: (rule) => rule.required(),
    }),
  ]
})