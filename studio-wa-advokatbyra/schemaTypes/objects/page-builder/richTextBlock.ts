import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Text",
  type: "object",

  fields: [
    defineField({
      name: "content",
      title: "Textinnehåll",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Text",
      };
    },
  },
});