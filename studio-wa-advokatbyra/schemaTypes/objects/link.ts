import { defineField, defineType, type ValidationContext } from "sanity";

function isDisabledEyebrowLink(context: ValidationContext): boolean {
  let current: unknown = context.document;

  for (const segment of context.path ?? []) {
    if (!current || typeof current !== "object") return false;
    if (Array.isArray(current)) {
      current = typeof segment === "number"
        ? current[segment]
        : typeof segment === "object" && "_key" in segment
          ? current.find((item) => item?._key === segment._key)
          : undefined;
    } else {
      const object = current as Record<string, unknown>;
      if (object._type === "eyebrow" && segment === "link" && object.hasLink !== true) {
        return true;
      }
      current = typeof segment === "string" ? object[segment] : undefined;
    }
  }
  return false;
}

export const link = defineType({
  name: "link",
  title: "Länk",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Annat namn (valfritt)",
      type: "string",
      description:
        "Lämna tomt för att använda namnet från det valda dokumentet.",
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "linkType",
      title: "Typ av länk",
      type: "string",
      options: {
        list: [
          {
            title: "Sida i Sanity",
            value: "internal",
          },
          {
            title: "Manuell eller extern länk",
            value: "external",
          },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (rule) => rule.custom((value, context) =>
        isDisabledEyebrowLink(context) || value ? true : "Välj typ av länk.",
      ),
    }),
    defineField({
      name: "internalReference",
      title: "Intern länk",
      type: "reference",
    
      to: [
        { type: "home" },
        { type: "page" },
        { type: "contactPage" },
        { type: "aboutPage" },
        { type: "serviceMainPage" },
        { type: "courseMainPage" },
        { type: "employee" },
        { type: "service" },
        { type: "course" },
        { type: "article" },
      ],
    
      hidden: ({ parent }) =>
        parent?.linkType !== "internal",
    
      validation: (rule) =>
        rule.custom((value, context) => {
          if (isDisabledEyebrowLink(context)) return true;
          const parent = context.parent as {
            linkType?: string;
          };
    
          if (
            parent?.linkType === "internal" &&
            !value
          ) {
            return "Välj vilken sida länken ska gå till.";
          }
    
          return true;
        }),
    }),
  
    defineField({
      name: "href",
      title: "Manuell eller extern länk",
      type: "string",
      description:
        "Exempel: /kontakt eller https://linkedin.com/...",
      hidden: ({ parent }) => parent?.linkType !== "external",

      validation: (rule) =>
        rule.custom((value, context) => {
          if (isDisabledEyebrowLink(context)) return true;
          const parent = context.parent as {
            linkType?: string;
          };

          if (
            parent?.linkType === "external" &&
            !value?.trim()
          ) {
            return "Ange en länk.";
          }

          return true;
        }),
    }),
  ],

  preview: {
    select: {
      customTitle: "title",
      linkType: "linkType",
      manualHref: "href",

      referencedType: "internalReference._type",
      referencedTitle: "internalReference.title",
      courseName: "internalReference.courseName",
      slug: "internalReference.slug.current",
      categorySlug: "internalReference.category.slug.current",
      referencedHref: "internalReference.href",
    },

    prepare({
      customTitle,
      linkType,
      manualHref,
      referencedType,
      referencedTitle,
      courseName,
      slug,
      referencedHref,
      categorySlug,
    }) {
      const inheritedTitle =
        courseName ??
        referencedTitle ??
        "Namnlös länk";

      const displayedTitle =
        customTitle?.trim() || inheritedTitle;

      const resolvedHref =
        linkType === "external"
          ? manualHref
          : referencedType === "course" && categorySlug && slug
            ? `/${categorySlug}/${slug}`
            : referencedHref;

      return {
        title: displayedTitle,
        subtitle: resolvedHref || "Länk saknas",
      };
    },
  },
});