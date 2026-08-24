import { defineField, defineType } from "sanity"
import {
  LinkIcon,
  ChevronDownIcon,
} from "@sanity/icons"

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigationslänk",
  type: "object",

  fields: [
    defineField({
      name: "label",
      title: "Namn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "link",
      title: "Länk",
      type: "reference",
      to: [{ type: "linkItem" }],
    }),

    defineField({
      name: "hasDropdown",
      title: "Har dropdown",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "dropdownSource",
      title: "Innehåll i dropdown",
      type: "string",
      hidden: ({ parent }) => !parent?.hasDropdown,

      options: {
        list: [
          { title: "Manuella länkar", value: "manual" },
          { title: "Alla medarbetare", value: "employees" },
          { title: "Alla tjänster", value: "services" },
          { title: "Alla kurser", value: "courses" },
        ],
        layout: "radio",
      },

      initialValue: "manual",
    }),

    defineField({
      name: "dropdownItems",
      title: "Dropdown-länkar",
      type: "array",

      hidden: ({ parent }) =>
        !parent?.hasDropdown ||
        parent?.dropdownSource !== "manual",

      of: [
        {
          type: "reference",
          to: [{ type: "linkItem" }],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "label",
      hasDropdown: "hasDropdown",
      source: "dropdownSource",
    },

    prepare({ title, hasDropdown, source }) {
      const sourceLabels: Record<string, string> = {
        manual: "Manuella länkar",
        employees: "Alla medarbetare",
        services: "Alla tjänster",
        courses: "Alla kurser",
      }

      return {
        title: title || "Namnlös länk",

        subtitle: hasDropdown
          ? `Dropdown · ${sourceLabels[source]  ?? "Okänd källa"}`
          : "Vanlig länk",

        media: hasDropdown
          ? ChevronDownIcon
          : LinkIcon,
      }
    },
  },
})