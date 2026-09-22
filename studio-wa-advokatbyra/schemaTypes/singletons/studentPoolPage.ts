import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockObject } from "../objects/block";

export const studentPoolPage = defineType({
  name: "studentPoolPage",
  title: "Studentpoolen",
  type: "document",
  icon: UsersIcon,

  fields: [
    defineField({
      name: "title",
      title: "Sidtitel",
      type: "string",
      initialValue: 'Studentpoolen',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      type: "string",
    }),
    defineField({
      name: "intro",
      type: "blockObject",
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