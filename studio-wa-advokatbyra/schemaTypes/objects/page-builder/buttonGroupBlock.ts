import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const buttonGroupBlock = defineType({
  name: "buttonGroupBlock",
  title: "Knappar",
  type: "object",

  fields: [
    defineField({
      name: "buttons",
      title: "Knappar",
      type: "array",
      of: [
        defineArrayMember({
          type: "button",
        }),
      ],
      validation: (rule) =>
        rule.required().min(1).max(3),
    }),
  ],

  preview: {
    select: {
      buttons: "buttons",
    },
    prepare({ buttons }) {
      const count = Array.isArray(buttons)
        ? buttons.length
        : 0;

      return {
        title: "Knappar",
        subtitle: `${count} knapp${count === 1 ? "" : "ar"}`,
      };
    },
  },
});