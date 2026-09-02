import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const employeeGridBlock = defineType({
  name: "employeeGridBlock",
  title: "Medarbetare",
  type: "object",

  fields: [
    defineField({
      name: "selectionMode",
      title: "Vilka medarbetare ska visas?",
      type: "string",
      options: {
        list: [
          {
            title: "Visa alla medarbetare",
            value: "all",
          },
          {
            title: "Välj medarbetare",
            value: "manual",
          },
        ],
        layout: "radio",
      },
      initialValue: "manual",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "employees",
      title: "Medarbetare",
      type: "array",
      hidden: ({ parent }) =>
        parent?.selectionMode !== "manual",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "employee" }],
          options: {
            disableNew: true,
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],

  preview: {
    select: {
      selectionMode: "selectionMode",
      employees: "employees",
    },
    prepare({ selectionMode, employees }) {
      const count = Array.isArray(employees)
        ? employees.length
        : 0;

      return {
        title: "Medarbetare",
        subtitle:
          selectionMode === "all"
            ? "Alla medarbetare"
            : `${count} valda medarbetare`,
      };
    },
  },
});