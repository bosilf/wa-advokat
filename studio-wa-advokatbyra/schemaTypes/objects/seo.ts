import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",

  fields: [
    defineField({
      name: "metaTitle",
      title: "SEO-titel",
      type: "string",
      description:
        "Titeln som kan visas i Googles sökresultat. Om den lämnas tom används sidans vanliga rubrik.",

      validation: (rule) => [
        rule
          .min(30)
          .warning("Försök skriva minst 30 tecken."),
        rule
          .max(60)
          .warning(
            "Titlar över cirka 60 tecken kan kortas av i sökresultatet.",
          ),
      ],
    }),

    defineField({
      name: "metaDescription",
      title: "Metabeskrivning",
      type: "text",
      rows: 3,
      description:
        "En tydlig sammanfattning av sidan för sökmotorer. Om den lämnas tom används sidans korta sammanfattning.",

      validation: (rule) => [
        rule
          .min(70)
          .warning("Försök skriva minst 70 tecken."),
        rule
          .max(160)
          .warning(
            "Beskrivningar över cirka 160 tecken kan kortas av i sökresultatet.",
          ),
      ],
    }),

    defineField({
      name: "socialImage",
      title: "Bild för delning",
      type: "image",
      description:
        "Visas när sidan delas på exempelvis LinkedIn, Facebook eller i meddelanden.",
      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          description: "Beskriv bildens innehåll kortfattat.",
        }),
      ],
    }),

    defineField({
      name: "canonicalUrl",
      title: "Kanonisk webbadress",
      type: "url",
      description:
        "Använd endast om en annan webbadress ska betraktas som originalversionen av innehållet.",

      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "noIndex",
      title: "Dölj från sökmotorer",
      type: "boolean",
      description:
        "Aktivera endast om sidan inte ska visas i sökmotorernas sökresultat.",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "metaTitle",
      description: "metaDescription",
      media: "socialImage",
      noIndex: "noIndex",
    },

    prepare({
      title,
      description,
      media,
      noIndex,
    }) {
      return {
        title: title || "Använder sidans vanliga titel",
        subtitle: noIndex
          ? "Dold från sökmotorer"
          : description || "Ingen egen metabeskrivning",
        media,
      };
    },
  },
});