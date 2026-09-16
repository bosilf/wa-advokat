import { defineField, defineType } from "sanity"
import { TextIcon } from "@sanity/icons"

export const titleObject = defineType({
  name: "titleObject",
  title: "Rubrik",
  type: "object",
  icon: TextIcon,

  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      description: 'Valfritt, bör vara kort för att beskriva sektionen. Info, Kontakt, etc.',
      name: "eyebrow",
      type: "eyebrow",
    }),
  ],

})