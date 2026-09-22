import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const studentPool = defineType({
  name: "studentPool",
  title: "Studentpoolen",
  type: "document",
  icon: UsersIcon,

  fields: [
    defineField({
      name: "name",
      title: "För- och efternamn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});