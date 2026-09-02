import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const page = defineType({
  name: "page",
  title: "Sida",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Innehåll",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Sidans namn",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "path",
      title: "Webbadress",
      type: "slug",
      group: "content",
      description:
        "Exempel: om-oss, tjanster/entreprenadratt eller juridikkurser/upphandling/grundkurs.",
      options: {
        source: "title",
        maxLength: 150,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) {
            return true;
          }

          if (
            value.current.startsWith("/") ||
            value.current.endsWith("/")
          ) {
            return "Skriv webbadressen utan inledande eller avslutande snedstreck.";
          }

          const levels = value.current
            .split("/")
            .filter(Boolean);

          if (levels.length > 3) {
            return "Webbadressen får ha högst tre nivåer.";
          }

          return true;
        }),
    }),

    defineField({
      name: "sections",
      title: "Sektioner",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "pageSection",
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      path: "path.current",
    },
    prepare({ title, path }) {
      return {
        title: title || "Namnlös sida",
        subtitle: path ? `/${path}` : "Webbadress saknas",
      };
    },
  },
});