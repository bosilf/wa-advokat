import { defineField, defineType } from "sanity";
import { AddCircleIcon } from '@sanity/icons'

import ButtonVariantInput from "../../components/buttonVariantInput";

const variantLabels: Record<string, string> = {
  primary: "Primär",
  secondary: "Sekundär",
  simple: "Enkel",
  simpleWhite: "Enkel ljus",
};

const staticInternalRoutes: Record<string, string> = {
  home: "/",
  contactPage: "/kontakt",
  aboutPage: "/om-oss",
  courseMainPage: "/juridikkurser",
};

const dynamicInternalRoutes: Record<string, string> = {
  employee: "/medarbetare",
  service: "/tjanster",
  course: "/juridikkurser",
  article: "/artiklar",
};

function getInternalHref(
  referenceType?: string,
  slug?: string,
): string | undefined {
  if (!referenceType) return undefined;

  const staticRoute = staticInternalRoutes[referenceType];

  if (staticRoute) {
    return staticRoute;
  }

  const baseRoute = dynamicInternalRoutes[referenceType];

  return baseRoute && slug
    ? `${baseRoute}/${slug}`
    : undefined;
}

export const button = defineType({
  name: "button",
  title: "knapp",
  type: "object",
  icon: AddCircleIcon,

  fields: [

    defineField({
      name: 'hasButton',
      type: 'boolean',
      initialValue: false,
      title: 'länkknapp',
      
    }),

    defineField({
      name: 'btnProps',
      type: 'object',
      hidden: ({parent}) => !parent?.hasButton,

      fields: [
        defineField({
          name: "link",
          title: "Länk",
          type: "navigationItem",
          validation: (rule) => 
            rule.custom((value, context) => {
              const parent = context.parent as {
                hasButton?: boolean
              }
    
              if (!parent?.hasButton) {
                return true
              }
    
              if (
                typeof value !== "string" ||
                !value.trim()
              ) {
                return "Välj eller skapa en ny länk.";
              }
              return true
            }),
        }),

        defineField({
          name: "variant",
          title: "Utseende",
          type: "string",
          description:
            "Välj knappens visuella variant.",
    
          options: {
            list: [
              {
                title: "Primär",
                value: "primary",
              },
              {
                title: "Sekundär",
                value: "secondary",
              },
              {
                title: "Enkel textlänk",
                value: "simple",
              },
              {
                title: "Enkel textlänk – ljus",
                value: "simpleWhite",
              },
            ],
          },
    
          components: {
            input: ButtonVariantInput,
          },
    
          initialValue: "primary",
          validation: (rule) => rule.required(),
        }),
    
        defineField({
          name: "hasIcon",
          title: "Visa ikon",
          type: "boolean",
          initialValue: true,
        }),
    
        defineField({
          name: "icon",
          title: "Ikon",
          type: "string",
          hidden: ({ parent }) => !parent?.hasIcon,
    
          options: {
            list: [
              {
                title: "Pil",
                value: "arrow",
              },
              {
                title: "Enkel pil",
                value: "arrowSimple",
              },
            ],
            layout: "radio",
          },
    
          initialValue: "arrow",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as {
                hasIcon?: boolean;
              };
    
              if (parent?.hasIcon && !value) {
                return "Välj vilken ikon som ska visas.";
              }
    
              return true;
            }),
        }),
    
        defineField({
          name: "ariaLabel",
          title: "Förtydligad etikett för skärmläsare",
          type: "string",
          description:
            'Valfritt. Används om knapptexten inte är tillräckligt tydlig, exempelvis om texten bara är "Läs mer".',
    
          validation: (rule) => rule.max(120),
        }),
      ]
    }),


  ],
  

  preview: {
    select: {
      linkLabel: "link.label",
      variant: "variant",
      linkType: "link.linkType",
      externalUrl: "link.externalUrl",
  
      internalTitle: "link.internalReference.title",
      internalCourseName: "link.internalReference.courseName",
      internalFirstName: "link.internalReference.firstName",
      internalLastName: "link.internalReference.lastName",
      internalType: "link.internalReference._type",
      internalSlug: "link.internalReference.slug.current",
  
      hasIcon: "hasIcon",
    },
  
    prepare({
      linkLabel,
      variant,
      linkType,
      externalUrl,
      internalTitle,
      internalCourseName,
      internalFirstName,
      internalLastName,
      internalType,
      internalSlug,
      hasIcon,
    }) {
      const employeeName = [
        internalFirstName,
        internalLastName,
      ]
        .filter(Boolean)
        .join(" ");
  
      const displayedLabel =
        linkLabel?.trim() ||
        internalCourseName ||
        internalTitle ||
        employeeName ||
        "Namnlös knapp";
  
      const destination =
        linkType === "external"
          ? externalUrl
          : getInternalHref(
              internalType,
              internalSlug,
            );
  
      return {
        title: displayedLabel,
        subtitle: [
          variantLabels[variant] ?? variant,
          destination || "Ingen destination",
          hasIcon ? "Med ikon" : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
})