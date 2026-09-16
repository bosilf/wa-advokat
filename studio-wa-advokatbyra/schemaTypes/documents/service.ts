import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Tjänster",
  type: "document",
  icon: CaseIcon,

  groups: [
    {
      name: "content",
      title: "Innehåll",
      default: true,
    },
    {
      name: "relations",
      title: "Experter och kopplingar",
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

  fields: [
    defineField({
      name: "title",
      title: "Tjänstens namn",
      type: "string",
      group: "content",

      validation: (rule) =>
        rule.required().min(3).max(120),
    }),

    defineField({
      name: "slug",
      title: "Länk till rättsområdet",
      group: "content",
      description:
        'Klicka på "Generate" för att skapa länken till kursen.',
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "eyebrow",
      group: "content",
      description:
        "Den mindre texten ovanför tjänstens huvudrubrik. Kan innehålla en valfri länk.",
    }),

    defineField({
      name: "excerpt",
      title: "Kort sammanfattning",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Används på tjänstekort, i listor och som reserv för metabeskrivningen.",

      validation: (rule) =>
        rule.required().min(50).max(220),
    }),

    defineField({
      name: "image",
      title: "Huvudbild",
      type: "image",
      group: "content",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          description:
            "Beskriv bildens innehåll för besökare som använder skärmläsare.",

          validation: (rule) =>
            rule.required().max(160),
        }),

        defineField({
          name: "caption",
          title: "Bildtext",
          type: "string",
          description: "Valfritt.",
        }),

        defineField({
          name: "credit",
          title: "Fotograf/bildkälla",
          type: "string",
          description: "Valfritt.",
        }),
      ],

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "body",
      title: "Introduktion",
      type: "array",
      group: "content",

      of: [
        {
          type: "block",

          styles: [
            { title: "Normal text", value: "normal" },
            { title: "Rubrik 2", value: "h2" },
            { title: "Rubrik 3", value: "h3" },
            { title: "Citat", value: "blockquote" },
          ],

          lists: [
            { title: "Punktlista", value: "bullet" },
            { title: "Numrerad lista", value: "number" },
          ],

          marks: {
            annotations: [
              {
                name: "externalLink",
                title: "Extern länk",
                type: "object",

                fields: [
                  defineField({
                    name: "href",
                    title: "Webbadress",
                    type: "url",

                    validation: (rule) =>
                      rule.required().uri({
                        scheme: ["http", "https"],
                      }),
                  }),

                  defineField({
                    name: "openInNewTab",
                    title: "Öppna i ny flik",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },

        {
          type: "image",
          title: "Bild",

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Alternativtext",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "caption",
              title: "Bildtext",
              type: "string",
            }),

            defineField({
              name: "credit",
              title: "Fotograf/bildkälla",
              type: "string",
            }),
          ],
        },
      ],

      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "sections",
      title: "Ytterligare sektioner",
      type: "array",
      group: "content",
      description:
        "Lägg till och sortera de sektioner som ska visas efter introduktionen.",

      of: [
        { type: "section" },
        { type: "cardContainer" },
        { type: "teamSection" },

        // Lägg till dessa när respektive schema är skapat
        // och registrerat:
        // { type: "imageDivider" },
        // { type: "quote" },
      ],
    }),

    defineField({
      name: "experts",
      title: "Ansvariga jurister",
      type: "array",
      group: "relations",
      description:
        "Medarbetarna visas som kort på tjänstens sida.",

      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],

          options: {
            disableNew: true,
          },
        },
      ],

      validation: (rule) =>
        rule.required().min(1).unique(),
    }),

    defineField({
      name: "relatedCourses",
      title: "Relaterade kurser",
      type: "array",
      group: "relations",
      description:
        "Välj kurser som är relevanta för tjänsten.",

      of: [
        {
          type: "reference",
          to: [{ type: "course" }],

          options: {
            disableNew: true,
          },
        },
      ],

      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: "cta",
      title: "Kontaktknapp",
      type: "button",
      group: "content",
      description:
        "Valfri knapp som visas efter tjänstens innehåll.",
    }),

    defineField({
      name: "sortOrder",
      title: "Sorteringsordning",
      type: "number",
      group: "settings",
      description:
        "Lägre nummer visas först i listor och navigation.",

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
      title: "Namn A–Ö",
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
      excerpt: "excerpt",
      firstExpertFirstName: "experts.0.firstName",
      firstExpertLastName: "experts.0.lastName",
      media: "image",
    },

    prepare({
      title,
      excerpt,
      firstExpertFirstName,
      firstExpertLastName,
      media,
    }) {
      const firstExpert = [
        firstExpertFirstName,
        firstExpertLastName,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        title: title || "Namnlös tjänst",
        subtitle:
          firstExpert ||
          excerpt ||
          "Ingen ansvarig jurist vald",
        media,
      };
    },
  },
});