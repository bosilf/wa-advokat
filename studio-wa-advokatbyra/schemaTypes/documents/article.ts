import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artiklar",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Innehåll",
      default: true,
    },
    {
      name: "relations",
      title: "Kopplingar",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().min(5).max(120),
    }),

    defineField({
      name: "slug",
      title: "Webbadress",
      type: "slug",
      group: "content",
      description:
        'Klicka på "Generate" för att skapa artikelns webbadress.',
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Kort sammanfattning",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Visas på artikelkort, i listor och i sökresultat på webbplatsen.",
      validation: (rule) =>
        rule.required().min(50).max(220),
    }),

    defineField({
      name: "writers",
      title: "Skriven av",
      type: "array",
      group: "content",
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
      name: "publishedAt",
      title: "Publiceringsdatum",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
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
          validation: (rule) => rule.required().max(160),
        }),

        defineField({
          name: "caption",
          title: "Bildtext",
          type: "string",
          description: "Valfritt. Visas under bilden.",
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
      title: "Artikeltext",
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
      name: "relatedServices",
      title: "Relaterade rättsområden",
      type: "array",
      group: "relations",
      description:
        "Koppla artikeln till relevanta rättsområden.",
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: "relatedCourses",
      title: "Relaterade kurser",
      type: "array",
      group: "relations",
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
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  orderings: [
    {
      title: "Nyast först",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Äldst först",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Rubrik A–Ö",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],

  // preview: {
  //   select: {
  //     title: "title",
  //     firstName: "writers.0.firstName",
  //     lastName: "writers.0.lastName",
  //     publishedAt: "publishedAt",
  //     media: "image",
  //   },
  // },

    preview: {
      select: {
        title: "title",
        slug: "slug.current",
      },
      prepare({ title, slug }) {
        return {
          title: title ?? "Namnlös artikel",
          subtitle: slug
            ? `/artiklar/${slug}`
            : "Slug saknas",
        };
      },
    },
});