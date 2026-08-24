import { defineField, defineType } from "sanity"
import { ListIcon } from "@sanity/icons"

const TITLE = "Navigering"

export const navigation = defineType({
  name: "navigation",
  title: TITLE,
  type: "document",
  icon: ListIcon,

  fields: [
    defineField({
      name: "headerNavigation",
      title: "Header navigation",
      type: "array",
      of: [{ type: "navigationItem" }],
    }),

    defineField({
      name: "footerNavigation",
      title: "Footer navigation",
      type: "array",
      of: [{ type: "navigationItem" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigering",
        subtitle: "Header- och footernavigation",
      }
    },
  },
})