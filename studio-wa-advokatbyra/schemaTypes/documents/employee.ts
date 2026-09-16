import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const currentYear = new Date().getFullYear();

export const employee = defineType({
  name: "employee",
  title: "Medarbetare",
  type: "document",
  icon: UsersIcon,

  groups: [
    {
      name: "profile",
      title: "Profil",
      default: true,
    },
    {
      name: "contact",
      title: "Kontakt",
    },
    {
      name: "qualifications",
      title: "Kompetens",
    },
    {
      name: "experience",
      title: "Arbetslivserfarenhet",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "firstName",
      title: "Förnamn",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().min(2).max(60),
    }),

    defineField({
      name: "lastName",
      title: "Efternamn",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().min(2).max(80),
    }),

    defineField({
      name: "slug",
      title: "Webbadress",
      type: "slug",
      group: "profile",
      description:
        'Klicka på "Generate" för att skapa webbadressen från medarbetarens namn.',
      options: {
        source: (document) =>
          `${document.firstName ?? ""} ${document.lastName ?? ""}`.trim(),
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "professionalTitle",
      title: "Juridisk titel",
      type: "string",
      group: "profile",
      description:
        "Ange om medarbetaren är advokat, jurist eller biträdande jurist.",
      options: {
        list: [
          {
            title: "Advokat",
            value: "advokat",
          },
          {
            title: "Jurist",
            value: "jurist",
          },
          {
            title: "Annat",
            value: "other",
          },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "roles",
      title: "Roller och yrkestitlar",
      type: "array",
      group: "profile",
      description:
        "Välj exempelvis delägare, grundare, kontorschef eller annan roll.",
      of: [
        {
          type: "reference",
          to: [{ type: "role" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(2).unique(),
    }),

    defineField({
      name: "image",
      title: "Porträtt",
      type: "image",
      group: "profile",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          description:
            'Exempel: "Porträtt av Anna Svensson, advokat på WA Advokatbyrå".',
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: "credit",
          title: "Fotograf",
          type: "string",
          description: "Valfritt.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "bio",
      title: "Om medarbetaren",
      type: "array",
      group: "profile",
      description:
        "Den längre presentationen som visas på medarbetarens egen sida.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal text", value: "normal" },
            { title: "Rubrik 2", value: "h2" },
            { title: "Rubrik 3", value: "h3" },
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
      ],
      validation: (rule) => rule.required().min(1),
    }),

    // Contact

    defineField({
      name: "phone",
      title: "Telefonnummer",
      type: "string",
      group: "contact",
      description:
        "Telefonnumret får innehålla exempelvis +46, mellanslag och bindestreck.",
      validation: (rule) =>
        rule
          .required()
          .regex(
            /^[+0-9][0-9\s()/-]{5,24}$/,
            "Ange ett giltigt telefonnummer.",
          ),
    }),

    defineField({
      name: "email",
      title: "E-post",
      type: "email",
      group: "contact",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "linkedInUrl",
      title: "LinkedIn",
      type: "url",
      group: "contact",
      description: "Valfritt.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    // Qualifications

    defineField({
      name: "expertise",
      title: "Rättsområden",
      type: "array",
      group: "qualifications",
      description:
        "Välj de rättsområden som medarbetaren är specialiserad inom.",
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (rule) => rule.required().min(1).unique(),
    }),

    defineField({
      name: "hasCourses",
      title: "Håller medarbetaren juridikkurser?",
      type: "boolean",
      group: "qualifications",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "courses",
      title: "Juridikkurser",
      type: "array",
      group: "qualifications",
      description:
        "Välj de juridikkurser som medarbetaren håller eller medverkar i.",
      hidden: ({ document }) => !document?.hasCourses,
      of: [
        {
          type: "reference",
          to: [{ type: "course" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (rule) =>
        rule.unique().custom((courses, context) => {
          if (
            context.document?.hasCourses &&
            (!Array.isArray(courses) || courses.length === 0)
          ) {
            return "Välj minst en juridikkurs.";
          }

          return true;
        }),
    }),

    defineField({
      name: "educationList",
      title: "Utbildningar",
      type: "array",
      group: "qualifications",
      of: [
        {
          name: "educationItem",
          title: "Utbildning",
          type: "object",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            defineField({
              name: "education",
              title: "Utbildning eller examen",
              type: "string",
              description: "Exempel: Juristexamen.",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "school",
              title: "Skola eller lärosäte",
              type: "string",
              description: "Exempel: Stockholms universitet.",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "yearStart",
              title: "Startår",
              type: "number",
              validation: (rule) =>
                rule.integer().min(1900).max(currentYear + 10),
            }),

            defineField({
              name: "yearEnd",
              title: "Examensår eller slutår",
              type: "number",
              description:
                "Ange examensåret. Lämna tomt om utbildningen fortfarande pågår.",
              validation: (rule) =>
                rule
                  .integer()
                  .min(1900)
                  .max(currentYear + 10)
                  .custom((yearEnd, context) => {
                    const parent = context.parent as {
                      yearStart?: number;
                    };

                    if (
                      yearEnd &&
                      parent?.yearStart &&
                      yearEnd < parent.yearStart
                    ) {
                      return "Slutåret kan inte vara tidigare än startåret.";
                    }

                    return true;
                  }),
            }),
          ],

          preview: {
            select: {
              education: "education",
              school: "school",
              yearStart: "yearStart",
              yearEnd: "yearEnd",
            },
            prepare({ education, school, yearStart, yearEnd }) {
              const years = yearStart
                ? `${yearStart}–${yearEnd ?? "pågående"}`
                : yearEnd
                  ? `${yearEnd}`
                  : null;

              return {
                title: education || "Namnlös utbildning",
                subtitle: [school, years].filter(Boolean).join(" · "),
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),

    // Work history

    defineField({
      name: "jobHistory",
      title: "Arbetslivserfarenhet",
      type: "array",
      group: "experience",
      description:
        "Lägg den senaste eller nuvarande anställningen överst.",
      of: [
        {
          name: "jobHistoryItem",
          title: "Anställning",
          type: "object",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            defineField({
              name: "jobTitle",
              title: "Befattning",
              type: "string",
              description: "Exempel: Advokat eller biträdande jurist.",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "employer",
              title: "Arbetsgivare",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "yearStart",
              title: "Startår",
              type: "number",
              validation: (rule) =>
                rule
                  .required()
                  .integer()
                  .min(1900)
                  .max(currentYear + 10),
            }),

            defineField({
              name: "isCurrent",
              title: "Nuvarande anställning",
              type: "boolean",
              initialValue: false,
            }),

            defineField({
              name: "yearEnd",
              title: "Slutår",
              type: "number",
              hidden: ({ parent }) => parent?.isCurrent === true,
              validation: (rule) =>
                rule.custom((yearEnd, context) => {
                  const parent = context.parent as {
                    yearStart?: number;
                    isCurrent?: boolean;
                  };

                  if (!parent?.isCurrent && !yearEnd) {
                    return "Ange slutår eller markera anställningen som nuvarande.";
                  }

                  if (
                    yearEnd &&
                    parent?.yearStart &&
                    yearEnd < parent.yearStart
                  ) {
                    return "Slutåret kan inte vara tidigare än startåret.";
                  }

                  return true;
                }),
            }),

            defineField({
              name: "description",
              title: "Beskrivning",
              type: "text",
              rows: 3,
              description:
                "Valfri kort beskrivning av arbetsuppgifter eller ansvarsområden.",
            }),
          ],

          preview: {
            select: {
              jobTitle: "jobTitle",
              employer: "employer",
              yearStart: "yearStart",
              yearEnd: "yearEnd",
              isCurrent: "isCurrent",
            },
            prepare({
              jobTitle,
              employer,
              yearStart,
              yearEnd,
              isCurrent,
            }) {
              const years = yearStart
                ? `${yearStart}–${isCurrent ? "pågående" : (yearEnd ?? "")}`
                : null;

              return {
                title: jobTitle || "Namnlös anställning",
                subtitle: [employer, years].filter(Boolean).join(" · "),
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "employeeDescription",
      type: 'string',
      title: 'Beskrivning av medarbetaren',
      description: 'En kort beskrivning av medarbetaren som syns på deras individuella sida.',
      group: 'seo',
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
      title: "Efternamn A–Ö",
      name: "lastNameAsc",
      by: [
        { field: "lastName", direction: "asc" },
        { field: "firstName", direction: "asc" },
      ],
    },
    {
      title: "Förnamn A–Ö",
      name: "firstNameAsc",
      by: [
        { field: "firstName", direction: "asc" },
        { field: "lastName", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      professionalTitle: "professionalTitle",
      role: "roles.0.title",
      media: "image",
    },
    prepare({
      firstName,
      lastName,
      professionalTitle,
      role,
      media,
    }) {
      const name = [firstName, lastName].filter(Boolean).join(" ");

      const professionalTitleLabels: Record<string, string> = {
        advokat: "Advokat",
        jurist: "Jurist",
        "biträdande-jurist": "Biträdande jurist",
      };

      const title = professionalTitle
        ? professionalTitleLabels[professionalTitle]
        : role;

      return {
        title: name || "Namnlös medarbetare",
        subtitle: [title, role].filter(Boolean).join(" · "),
        media,
      }
    }
  }
})