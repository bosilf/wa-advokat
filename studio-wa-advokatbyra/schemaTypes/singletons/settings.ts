import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const TITLE = "Webbplatsinställningar";
const currentYear = new Date().getFullYear();

export const settings = defineType({
  name: "settings",
  title: TITLE,
  type: "document",
  icon: CogIcon,

  groups: [
    {
      name: "company",
      title: "Företaget",
      default: true,
    },
    {
      name: "contact",
      title: "Kontakt och kontor",
    },
    {
      name: "footer",
      title: "Footer",
    },
    {
      name: "seo",
      title: "Global SEO",
    },
  ],

  fields: [
    defineField({
      name: "siteName",
      title: "Webbplatsens namn",
      type: "string",
      group: "company",
      initialValue: "WA Advokatbyrå",

      validation: (rule) =>
        rule.required().min(2).max(100),
    }),

    defineField({
      name: "legalName",
      title: "Juridiskt företagsnamn",
      type: "string",
      group: "company",
      description:
        "Företagets fullständiga registrerade namn.",

      validation: (rule) =>
        rule.required().min(2).max(120),
    }),

    defineField({
      name: "organisationNumber",
      title: "Organisationsnummer",
      type: "string",
      group: "company",
      description: "Exempel: 556123-4567.",

      validation: (rule) =>
        rule
          .required()
          .regex(
            /^\d{6}-?\d{4}$/,
            "Ange organisationsnumret som 556123-4567.",
          ),
    }),

    defineField({
      name: "logo",
      title: "Logotyp",
      type: "image",
      group: "company",
      description:
        "Valfritt om logotypen redan finns som en kodbaserad SVG.",

      options: {
        hotspot: false,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          description:
            'Exempel: "WA Advokatbyrå".',
          validation: (rule) =>
            rule.required().max(100),
        }),
      ],
    }),
    // defineField({
    //   name: "logo",
    //   title: "Logotyp",
    //   type: "image",
    //   group: "company",
    //   description:
    //     "Valfritt om logotypen redan finns som en kodbaserad SVG.",

    //   options: {
    //     hotspot: false,
    //   },

    //   fields: [
    //     defineField({
    //       name: "alt",
    //       title: "Alternativtext",
    //       type: "string",
    //       description:
    //         'Exempel: "WA Advokatbyrå".',
    //       validation: (rule) =>
    //         rule.required().max(100),
    //     }),
    //   ],
    // }),

    defineField({
      name: "mainPhone",
      title: "Huvudnummer",
      type: "string",
      group: "contact",
      description:
        "Får innehålla landskod, mellanslag och bindestreck.",

      validation: (rule) =>
        rule
          .required()
          .regex(
            /^[+0-9][0-9\s()/-]{5,24}$/,
            "Ange ett giltigt telefonnummer.",
          ),
    }),

    defineField({
      name: "mainEmail",
      title: "Huvudadress för e-post",
      type: "email",
      group: "contact",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "offices",
      title: "Kontor",
      type: "array",
      group: "contact",
      description:
        "Det första kontoret används som huvudadress.",

      of: [
        {
          name: "office",
          title: "Kontor",
          type: "object",

          options: {
            collapsible: true,
            collapsed: false,
          },

          fields: [
            defineField({
              name: "name",
              title: "Kontorets namn",
              type: "string",
              description: 'Exempel: "Stockholm".',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "streetAddress",
              title: "Gatuadress",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "postalCode",
              title: "Postnummer",
              type: "string",

              validation: (rule) =>
                rule
                  .required()
                  .regex(
                    /^\d{3}\s?\d{2}$/,
                    "Ange postnumret som 123 45.",
                  ),
            }),

            defineField({
              name: "city",
              title: "Ort",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "country",
              title: "Land",
              type: "string",
              initialValue: "Sverige",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "phone",
              title: "Kontorets telefonnummer",
              type: "string",

              validation: (rule) =>
                rule.regex(
                  /^[+0-9][0-9\s()/-]{5,24}$/,
                  "Ange ett giltigt telefonnummer.",
                ),
            }),

            defineField({
              name: "email",
              title: "Kontorets e-postadress",
              type: "email",
            }),

            defineField({
              name: "mapUrl",
              title: "Länk till karta",
              type: "url",
              description:
                "Valfri länk till exempelvis Google Maps.",

              validation: (rule) =>
                rule.uri({
                  scheme: ["http", "https"],
                }),
            }),
          ],

          preview: {
            select: {
              title: "name",
              street: "streetAddress",
              postalCode: "postalCode",
              city: "city",
            },

            prepare({
              title,
              street,
              postalCode,
              city,
            }) {
              return {
                title: title || "Namnlöst kontor",
                subtitle: [
                  street,
                  [postalCode, city]
                    .filter(Boolean)
                    .join(" "),
                ]
                  .filter(Boolean)
                  .join(", "),
              };
            },
          },
        },
      ],

      validation: (rule) =>
        rule.required().min(1),
    }),

    defineField({
      name: "footerEyebrow",
      title: "Footer eyebrow",
      type: "eyebrow",
      group: "footer",
    }),

    defineField({
      name: "footerHeading",
      title: "Footer-rubrik",
      type: "string",
      group: "footer",
      description:
        "Exempelvis en rubrik ovanför kontaktuppgifterna.",

      validation: (rule) => rule.max(120),
    }),

    defineField({
      name: "footerDescription",
      title: "Footer-text",
      type: "text",
      rows: 3,
      group: "footer",
      validation: (rule) => rule.max(400),
    }),

    defineField({
      name: "footerCta",
      title: "Footer-knapp",
      type: "button",
      group: "footer",
      description: "Valfri kontaktknapp i footern.",
    }),

    defineField({
      name: "footerText",
      title: "Copyrighttext",
      type: "string",
      group: "footer",
      description:
        "Årtalet skapas automatiskt i Next.js. Skriv därför inte in året här.",

      initialValue:
        "WA Advokatbyrå. Alla rättigheter förbehållna.",

      validation: (rule) =>
        rule.required().max(200),
    }),

    defineField({
      name: "defaultSeo",
      title: "Standard-SEO",
      type: "seo",
      group: "seo",
      description:
        "Används som reserv när en sida saknar egen SEO-titel, metabeskrivning eller delningsbild.",
    }),
  ],

  preview: {
    select: {
      siteName: "siteName",
      legalName: "legalName",
      offices: "offices",
    },

    prepare({
      siteName,
      legalName,
      offices,
    }) {
      const officeCount = offices?.length ?? 0;

      return {
        title: siteName || TITLE,
        subtitle: [
          legalName,
          `${officeCount} ${
            officeCount === 1 ? "kontor" : "kontor"
          }`,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});