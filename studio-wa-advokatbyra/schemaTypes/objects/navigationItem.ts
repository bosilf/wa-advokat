import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const fixedRoutes: Record<string, string> = {
  home: "/",
  contactPage: "/kontakt",
  aboutPage: "/om-oss",
  courseMainPage: "/juridikkurser",
};

const dynamicRoutes: Record<string, string> = {
  employee: "/medarbetare",
  service: "/tjanster",
  course: "/juridikkurser",
  article: "/artiklar",
};

const typeLabels: Record<string, string> = {
  home: "Startsidan",
  contactPage: "Kontakt",
  aboutPage: "Om oss",
  courseMainPage: "Juridikkurser",
};

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Länk",
  type: "object",
  icon: LinkIcon,

  fields: [
    defineField({
      name: "label",
      title: "Annan länktext (valfritt)",
      type: "string",
      description:
        "Lämna tomt för att använda namnet från den valda länken.",
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "link",
      title: "Välj länk",
      type: "reference",
      to: [{ type: "link" }],
      description:
        "Välj en befintlig länk eller skapa en ny.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hasDropdown",
      title: "Visa dropdown",
      type: "boolean",
      initialValue: false,
    
      hidden: ({ path }) =>
        path?.[0] !== "headerNavigation",
    }),
    
    defineField({
      name: "dropdownSource",
      title: "Innehåll i dropdown",
      type: "string",
    
      options: {
        layout: "radio",
        list: [
          {
            title: "Medarbetare",
            value: "employees",
          },
          {
            title: "Rättsområden",
            value: "services",
          },
          {
            title: "Juridikkurser",
            value: "courses",
          },
        ],
      },
    
      hidden: ({ parent, path }) =>
        path?.[0] !== "headerNavigation" ||
        !parent?.hasDropdown,
    
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {
            hasDropdown?: boolean;
          };
    
          if (parent?.hasDropdown && !value) {
            return "Välj vad dropdown-menyn ska visa.";
          }
    
          return true;
        }),
    }),
  ],

  preview: {
    select: {
      hasDropdown: "hasDropdown",
      dropdownSource: "dropdownSource",
      customLabel: "label",
      linkTitle: "link.title",
      linkType: "link.linkType",
      manualHref: "link.href",

      referencedType:
        "link.internalReference._type",
      referencedTitle:
        "link.internalReference.title",
      courseName:
        "link.internalReference.courseName",
      slug:
        "link.internalReference.slug.current",
    },

    prepare({
      customLabel,
      linkTitle,
      linkType,
      manualHref,
      referencedType,
      referencedTitle,
      courseName,
      slug,
      hasDropdown,
      dropdownSource,
    }) {
      
      const inheritedTitle =
        linkTitle?.trim() ||
        courseName ||
        referencedTitle ||
        typeLabels[referencedType] ||
        manualHref ||
        "Namnlös länk";

      const displayedTitle =
        customLabel?.trim() ||
        inheritedTitle;

      const basePath =
        dynamicRoutes[referencedType];

      const resolvedHref =
        linkType === "external"
          ? manualHref
          : fixedRoutes[referencedType] ??
            (basePath && slug
              ? `${basePath}/${slug}`
              : undefined);
      const dropdownLabels: Record<string, string> = {
        employees: "Medarbetare",
        services: "Rättsområden",
        courses: "Juridikkurser",
      };

      const dropdownDescription =
        hasDropdown && dropdownSource
          ? `Dropdown: ${dropdownLabels[dropdownSource]}`
          : null;

      return {
        title: displayedTitle,
        subtitle: [
          resolvedHref || "Destination saknas",
          dropdownDescription,
        ]
          .filter(Boolean)
          .join(" · "),
        media: LinkIcon,
      };
    },
  },
});