import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const accordionBlock = defineType({
  name: "accordionBlock",
  title: "Dragspel",
  type: "object",

  fields: [
    defineField({
      name: "items",
      title: "Dragspel",
      type: "array",
      of: [
        defineArrayMember({
          type: "accordionItem",
        }),
      ],
      validation: (rule) =>
        rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      const count = Array.isArray(items)
        ? items.length
        : 0;

      return {
        title: "Dragspel",
        subtitle: `${count} ${
          count === 1 ? "innehållsdel" : "innehållsdelar"
        }`,
      };
    },
  },
});