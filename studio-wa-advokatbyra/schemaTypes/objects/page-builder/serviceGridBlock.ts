import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const serviceGridBlock = defineType({
  name: "serviceGridBlock",
  title: "Rättsområden",
  type: "object",

  fields: [
    defineField({
      name: "services",
      title: "Rättsområden",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "service" }],
          options: {
            disableNew: true,
          },
        }),
      ],
      validation: (rule) =>
        rule.required().min(1).unique(),
    }),
  ],

  preview: {
    select: {
      services: "services",
    },
    prepare({ services }) {
      const count = Array.isArray(services)
        ? services.length
        : 0;

      return {
        title: "Rättsområden",
        subtitle: `${count} valda rättsområden`,
      };
    },
  },
});