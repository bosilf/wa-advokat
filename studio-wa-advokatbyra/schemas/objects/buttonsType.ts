import { defineField, defineType } from "sanity"
import ButtonVariantInput from "../../components/buttonVariantInput"

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",

  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "link",
      title: "Link",
      type: "reference",
      to: [{ type: "linkItem" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "variant",
      title: "Button style",
      type: "string",
    
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Text länk", value: "simple" },
        ],
      },
    
      components: {
        input: ButtonVariantInput,
      },
    
      initialValue: "primary",
    }),

    defineField({
      name: "icon",
      title: "Har ikon",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "label",
      linkName: "link.pageName",
      variant: "variant",
    },

    prepare({ title, linkName, variant }) {
      return {
        title,
        subtitle: `${linkName ?? "Ingen länk"} · ${variant ?? ""}`,
      }
    },
  },
})