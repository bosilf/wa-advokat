import { ListIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const TITLE = "Navigering";

export const navigation = defineType({
  name: "navigation",
  title: TITLE,
  type: "document",
  icon: ListIcon,

  groups: [
    {
      name: "header",
      title: "Huvudnavigation",
      default: true,
    },
    {
      name: "footer",
      title: "Footernavigation",
    },
  ],

  fields: [
    defineField({
      name: "headerNavigation",
      title: "Navigationslänkar",
      type: "array",
      group: "header",
      description:
        "Länkarna används i både desktop- och mobilmenyn. Dra dem för att ändra ordningen.",

      of: [
        {
          type: "navigationItem",
        },
      ],

      validation: (rule) =>
        rule.required().min(1).max(10).unique(),
    }),


    // FOOTER – NAVIGERING
    defineField({
      name: "footerNavigationTitle",
      title: "Rubrik – navigering",
      type: "string",
      group: "footer",
      initialValue: "Navigering",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "footerNavigation",
      title: "Navigationslänkar",
      type: "array",
      group: "footer",
      description:
        "Välj bland befintliga länkar. Dra dem för att ändra ordningen.",
      of: [
        {
          type: "navigationItem",
        },
      ],
      validation: (rule) =>
        rule.required().min(1).max(15).unique(),
    }),


    // FOOTER – JURIDIKKURSER

    defineField({
      name: "footerCoursesTitle",
      title: "Rubrik – juridikkurser",
      type: "string",
      group: "footer",
      initialValue: "Juridikkurser",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "footerCourseNavigation",
      title: "Länkar till juridikkurser",
      type: "array",
      group: "footer",
      description:
        "Välj de befintliga kurslänkar som ska visas i footern.",
      of: [
        {
          type: "navigationItem",
        },
      ],
      validation: (rule) => rule.max(10).unique(),
    }),

    // defineField({
    //   name: "footerCourseCta",
    //   title: "Knapp efter juridikkurser",
    //   type: "navigationItem",
    //   group: "footer",
    //   description:
    //     "Valfri länk, exempelvis Boka kurs. Länken väljs bland befintliga länkar.",
    // }),
    defineField({
      name: "footerCourseCta",
      title: "Knapp i navigationen",
      type: "button",
      group: "footer",
      description:
        "Valfri knapp, exempelvis Kontakt eller Boka rådgivning.",
    }),


    // FOOTER – RÄTTSOMRÅDEN

    defineField({
      name: "footerPracticeAreasTitle",
      title: "Rubrik – rättsområden",
      type: "string",
      group: "footer",
      initialValue: "Rättsområden",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "footerPracticeAreaNavigation",
      title: "Länkar till rättsområden",
      type: "array",
      group: "footer",
      description:
        "Välj de befintliga rättsområdeslänkar som ska visas i footern.",
      of: [
        {
          type: "navigationItem",
        },
      ],
      validation: (rule) => rule.max(20).unique(),
    }),

    // FOOTER – JURIDISKA LÄNKAR

    defineField({
      name: "legalNavigation",
      title: "Juridiska länkar",
      type: "array",
      group: "footer",
      description:
        "Exempelvis integritetspolicy, cookiepolicy och tillgänglighetsredogörelse.",
      of: [
        {
          type: "navigationItem",
        },
      ],
      validation: (rule) => rule.max(10).unique(),
    }),
  ],

  preview: {
    select: {
      headerItems: "headerNavigation",
      footerItems: "footerNavigation",
      legalItems: "legalNavigation",
    },

    prepare({
      headerItems,
      footerItems,
      legalItems,
    }) {
      const headerCount = headerItems?.length ?? 0;
      const footerCount = footerItems?.length ?? 0;
      const legalCount = legalItems?.length ?? 0;

      return {
        title: TITLE,
        subtitle: [
          `${headerCount} menylänkar`,
          `${footerCount} footerlänkar`,
          legalCount > 0
            ? `${legalCount} juridiska länkar`
            : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});