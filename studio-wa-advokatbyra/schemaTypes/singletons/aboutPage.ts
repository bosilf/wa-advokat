import {
  defineArrayMember,
  defineField,
  defineType
} from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Om oss",
  type: "document",

  groups: [
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "benefits",
      title: "Fördelar",
    },
    {
      name: "team",
      title: "Medarbetare",
    },
    {
      name: "practiceAreas",
      title: "Rättsområden",
    },
    {
      name: "advice",
      title: "Rådgivning",
    },
    {
      name: "courses",
      title: "Utbildningar",
    },
    {
      name: "contact",
      title: "Kontakt",
    },
    {
      name: "additional",
      title: "Extra innehåll",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "heroRegular",
      group: "hero",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "benefitsSection",
      title: "Specialisering",
      type: "object",
      group: "benefits",

      fields: [
        defineField({
          name: "items",
          title: "Fördelar",
          type: "array",
          of: [
            defineArrayMember({
              name: "aboutBenefitItem",
              title: "Fördel",
              type: "object",

              fields: [
                defineField({
                  name: "title",
                  title: "Rubrik",
                  type: "string",
                  validation: (rule) =>
                    rule.required().max(120),
                }),

                defineField({
                  name: "text",
                  title: "Beskrivning",
                  type: "text",
                  rows: 3,
                  validation: (rule) =>
                    rule.required().max(400),
                }),

                defineField({
                  name: "icon",
                  title: "Ikon",
                  type: "string",
                  options: {
                    list: [
                      {
                        title: "Bock",
                        value: "check",
                      },
                      {
                        title: "Pil",
                        value: "arrow",
                      },
                    ],
                  },
                  initialValue: "check",
                }),
              ],

              preview: {
                select: {
                  title: "title",
                  text: "text",
                },

                prepare({ title, text }) {
                  return {
                    title:
                      title || "Namnlös fördel",
                    subtitle: text,
                  };
                },
              },
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).max(6),
        }),
      ],
    }),

    defineField({
      name: "teamSection",
      title: "Medarbetare",
      type: "object",
      group: "team",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "text",
          title: "Introduktion",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "teamMembers",
          title: "Medarbetare",
          type: "array",
          description:
            "Välj vilka medarbetare som ska visas och dra dem till önskad ordning.",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "employee" }],
              options: {
                disableNew: true,
              },
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).unique(),
        }),
        defineField({
          name: "students",
          title: "Studentpoolen",
          type: "array",
          description:
            "Välj vilka i studentpoolen som ska visas och dra dem till önskad ordning.",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "studentPool" }],
              options: {
                disableNew: true,
              },
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).unique(),
        }),

        defineField({
          name: "cta",
          title: "Knapp",
          type: "button",
        }),
      ],
    }),

    defineField({
      name: "practiceAreasSection",
      title: "Rättsområden",
      type: "object",
      group: "practiceAreas",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
        }),

        defineField({
          name: "text",
          title: "Introduktion",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
            }),
          ],
        }),

        defineField({
          name: "services",
          title: "Rättsområden",
          type: "array",
          description:
            "Informationen på korten hämtas från de valda rättsområdena.",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "service" }],
              options: {
                disableNew: true,
              },
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).unique(),
        }),

        defineField({
          name: "cta",
          title: "Knapp",
          type: "button",
        }),
      ],
    }),

    defineField({
      name: "adviceSection",
      title: "Rådgivning",
      type: "object",
      group: "advice",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "text",
          title: "Text",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
            }),
          ],
          validation: (rule) =>
            rule.required().min(1),
        }),

        defineField({
          name: "cta",
          title: "Knapp",
          type: "button",
        }),
      ],
    }),

    defineField({
      name: "coursesSection",
      title: "Utbildningar och kurser",
      type: "object",
      group: "courses",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "subheading",
          title: "Underrubrik",
          type: "string",
        }),

        defineField({
          name: "text",
          title: "Text",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
            }),
          ],
          validation: (rule) =>
            rule.required().min(1),
        }),

        defineField({
          name: "courses",
          title: "Utvalda kurser",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "course" }],
              options: {
                disableNew: true,
              },
            }),
          ],
          validation: (rule) => rule.unique(),
        }),

        defineField({
          name: "cta",
          title: "Knapp",
          type: "button",
        }),
      ],
    }),

    defineField({
      name: "contactSection",
      title: "Kontakt",
      type: "object",
      group: "contact",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "text",
          title: "Introduktion",
          type: "text",
          rows: 4,
        }),

        defineField({
          name: "showContactForm",
          title: "Visa kontaktformulär",
          type: "boolean",
          initialValue: true,
        }),

        defineField({
          name: "form",
          title: "Formulärtexter",
          type: "object",
          hidden: ({ parent }) =>
            parent?.showContactForm === false,
          initialValue: {
            title: "Skicka ett meddelande!",
            nameLabel: "För- och efternamn",
            emailLabel: "E-post",
            phoneLabel: "Telefon",
            messagePlaceholder:
              "Kontakta oss förutsättningslöst och berätta om dina frågor.",
            submitLabel: "Skicka meddelande",
          },

          fields: [
            defineField({
              name: "title",
              title: "Formulärets rubrik",
              type: "string",
            }),

            defineField({
              name: "nameLabel",
              title: "Namn",
              type: "string",
            }),

            defineField({
              name: "emailLabel",
              title: "E-post",
              type: "string",
            }),

            defineField({
              name: "phoneLabel",
              title: "Telefon",
              type: "string",
            }),

            defineField({
              name: "messagePlaceholder",
              title: "Meddelandetext",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "submitLabel",
              title: "Knapptext",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "additionalSections",
      title: "Ytterligare innehåll",
      description:
        "Valfria sektioner som visas efter det fasta innehållet.",
      type: "array",
      group: "additional",
      of: [
        defineArrayMember({
          type: "pageSection",
        }),
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Om oss",
        subtitle: "WA Advokatbyrå",
      };
    },
  },
})