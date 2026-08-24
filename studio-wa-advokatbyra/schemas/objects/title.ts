import { defineField, defineType } from "sanity"
import {
  TextIcon,
} from "@sanity/icons"


export const titleObject = defineType({
  name: "titleObject",
  title: "Rubrik",
  type: "object",
  icon: TextIcon,

  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
})