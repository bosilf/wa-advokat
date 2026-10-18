import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const fixedRoutes: Record<string, string> = {
  home: "/",
  contactPage: "/kontakt",
  aboutPage: "/om-oss",
  courseMainPage: "/juridikkurser",
};

const dynamicRoutes: Record<string, string> = {
  employee: "/om-oss",
  service: "/rattsomraden",
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
    defineField({
      name: "customizeDropdown",
      title: "Anpassa innehåll och ordning",
      type: "boolean",
      initialValue: false,
      description: "Välj vilka poster som ska visas och dra dem till önskad ordning. Avstängt visar det automatiska innehållet.",
      hidden: ({parent, path}) => path?.[0] !== "headerNavigation" || !parent?.hasDropdown,
    }),
    defineField({
      name: "selectedEmployees",
      title: "Medarbetare i dropdown",
      type: "array",
      description: "Lägg till eller ta bort medarbetare. Dra posterna för att ändra ordningen.",
      of: [{type: "reference", to: [{type: "employee"}]}],
      hidden: ({parent}) => !parent?.hasDropdown || !parent?.customizeDropdown || parent?.dropdownSource !== "employees",
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "selectedServices",
      title: "Rättsområden i dropdown",
      type: "array",
      description: "Lägg till eller ta bort rättsområden. Dra posterna för att ändra ordningen.",
      of: [{type: "reference", to: [{type: "service"}]}],
      hidden: ({parent}) => !parent?.hasDropdown || !parent?.customizeDropdown || parent?.dropdownSource !== "services",
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "dropdownCourseGroups",
      title: "Kursgrupper i dropdown",
      type: "array",
      description: "Dra grupperna för att ändra ordningen. Öppna en grupp för att välja och ordna dess kurser.",
      hidden: ({parent}) => !parent?.hasDropdown || !parent?.customizeDropdown || parent?.dropdownSource !== "courses",
      of: [{
        type: "object",
        name: "dropdownCourseGroup",
        title: "Kursgrupp",
        fields: [
          {name: "category", title: "Kurskategori", type: "reference", to: [{type: "courseCategory"}], validation: (rule) => rule.required()},
          {name: "title", title: "Annan grupprubrik (valfritt)", type: "string"},
          {name: "courses", title: "Kurser och ordning", type: "array", description: "Välj kurser och dra dem till önskad ordning.", of: [{type: "reference", to: [{type: "course"}]}], validation: (rule) => rule.unique()},
        ],
        preview: {select: {title: "title", category: "category.title"}, prepare: ({title, category}) => ({title: title || category || "Kursgrupp"})},
      }],
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