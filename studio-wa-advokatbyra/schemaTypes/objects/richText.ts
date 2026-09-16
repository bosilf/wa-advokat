import { CheckmarkCircleIcon } from "@sanity/icons";
import {
  defineArrayMember,
  defineType,
} from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Formaterad text",
  type: "array",

  of: [
    defineArrayMember({
      type: "block",

      styles: [
        {
          title: "Brödtext",
          value: "normal",
        },
        {
          title: "Stor rubrik – Display",
          value: "display",
        },
        {
          title: "Rubrik – H2",
          value: "h2",
        },
        {
          title: "Underrubrik – H3",
          value: "h3",
        },
        {
          title: "Eyebrow",
          value: "eyebrow",
        },
        {
          title: "Citat",
          value: "blockquote",
        },
      ],

      lists: [
        {
          title: "Punktlista",
          value: "bullet",
        },
        {
          title: "Numrerad lista",
          value: "number",
        },
        {
          title: "Checklista",
          value: "check",
          icon: CheckmarkCircleIcon,
        },
      ],
    }),
  ],
});