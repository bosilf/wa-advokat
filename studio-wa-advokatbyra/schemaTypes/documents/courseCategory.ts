import CategoryPreview from '../../src/studio/CategoryPreview'
import { BookIcon, LinkIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const courseCategory = defineType({
  name: "courseCategory",
  title: "Utbildningskategorier",
  type: "document",
  icon: BookIcon,

  groups: [
    {
      name: "content",
      title: "Innehåll",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Kategorinamn",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().min(3).max(100),
    }),
    defineField({
      name: "image",
      title: "Kategoribild",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "slug",
      title: "Länk",
      type: "slug",
      group: "content",
      description:
        'Klicka på "Generate" för att skapa länken till kurskategorin.',
      icon: LinkIcon,
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introTitle",
      title: "Intro Rubrik",
      type: "string",
      group: "content",
    }),
    
    defineField({
      name: "introText",
      title: "Intro text",
      type: "blockObject",
      group: "content",
    }),
    
    defineField({
      name: 'companyCourseSection',
      title: 'Företagsanpassad kurs innehåll:',
      group: "content",
      type: 'object',
      fields: [
        {
          type: 'titleObject',
          name: 'title'
        },
        {
          type: 'blockObject',
          name: 'text'
        }
      ]
    }),

    defineField({
      name: 'courseLecturerSection',
      title: 'Kursledare innehåll:',
      group: "content",
      type: 'object',
      fields: [
        {
          type: 'image',
          name: 'image',
          title: 'Bild Kursledare',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternativtext",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        },
        {
          type: 'reference',
          name: 'lecturer',
          to: [
            { type: 'employee' }
          ]
        },
        {
          type: 'blockObject',
          title: 'Beskrivning',
          name: 'text'
        },
        {
          type: 'button',
          title: 'Kursbokning, knapp',
          name: 'cta'
        }
      ]
    }),

    defineField({
      name: "courseListSection",
      title: "Kursutbud innehåll",
      description: "Kurslistan visar automatiskt publicerade kurser med denna kategori, i alfabetisk ordning. Här redigerar du rubrik och beskrivning.",
      group: "content",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Rubrik",
          type: "titleObject",
        }),
    
        defineField({
          name: "text",
          title: "Beskrivning",
          type: "blockObject",
        }),
    
        defineField({
          name: "courseList",
          hidden: true,
          title: "Kurser",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{type: "course"}],
            }),
          ],
          validation: (rule) =>
            rule.unique(),
        }),
      ],
    }),
    defineField({
      name: 'imageDivider',
      type: 'object',
      fields: [
        {
          type: 'image',
          name: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'string',
          name: 'alt'
        }
      ]
    }),

    defineField({
      name: 'courseInfoSection',
      title: 'Kursinfo innehåll:',
      group: "content",
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'title'
            },
            {
              type: 'blockObject',
              name: 'text'
            },
          ]
        })
      ]
    }),

    defineField({
      group: 'content',
      name: 'contactSection',
      title: 'Kontakt sektion:',
      type: 'titleObject',
    }),

    defineField({
      group: 'content',
      name: 'courseInfoLongSection',
      title: 'Kursinfo längre text:',
      type: 'object',
      fields: [
        { type: 'titleObject', name: 'title', title: 'Rubrik' },
        { type: 'blockObject', name: 'text', title: 'Beskrivning' }
      ]
    }),
    defineField({
      group: 'content',
      name: 'courseOfferingText',
      title: 'Utbildningserbjudande – text',
      type: 'blockObject',
    }),
    defineField({
      group: 'content',
      name: 'courseQuotesSection',
      title: 'Omdömen:',
      type: 'array',
      of: [
        { type: 'object', 
          name: 'quotes', 
          title: 'Lägg till citat', 
          fields: [
            { type: 'text', name: 'quote', description: "Utan citattecken", title: 'Citat:' },
            { type: 'string', name: 'person', title: 'Namn, person:' },
            { type: 'string', name: 'courseLabel', title: 'Kursnamn i omdömet', description: 'Valfri visningstext, till exempel kursnamn och årtal.' },
            { 
              type: 'reference', 
              name: 'courseTaken', 
              title: 'Om kurs:', 
              to: [{type: 'course'}] 
            },
          ]
        }
      ]
    }),
    
    defineField({
      name: "excerpt",
      title: "Kort beskrivning",
      type: "blockObject",
      group: "content",
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  components: {preview: CategoryPreview},

  preview: {
    select: {
      slug: 'slug.current',
      categoryTitle: 'title',
      categorySlug: 'slug.current',
      title: 'title',
      media: 'image'
    },
    prepare({ title, slug, media, categoryTitle, categorySlug }) {
      return {
        categoryTitle,
        categorySlug,
        title: title ?? "Namnlös kurskategori",
        subtitle: slug
          ? `/${slug}/`
          : "Slug saknas",
        media: media,
      };
    },
  }
});
