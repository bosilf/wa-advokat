import {CaseIcon} from '@sanity/icons'

import {defineField, defineType, defineArrayMember} from 'sanity'

export const courseMainPage = defineType({
  name: 'courseMainPage',
  title: 'Kurser',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'content', title: 'Innehåll'},
    {name: 'seo', title: 'Global SEO'},
  ],
  fields: [
    defineField({
      type: 'image', 
      name: 'image', 
      title: 'Beskrivning',
      group: 'hero',
        options: {
          hotspot: true,
        },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'title',
      group: 'hero',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      group: 'hero',
      title: 'Ögonbryn',
      type: 'string',
    }),
    defineField({
      name: "introSection",
      title: "Intro",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
        }),

        defineField({
          name: "text",
          title: "Introduktion",
          type: "blockObject",
        }),
      ]

    }),
    defineField({
      name: "courseOpportunities",
      title: "Kurstillfällen",
      group: 'content',
      type: "object",
      fields: [
        {
          name: "title",
          title: "Rubrik",
          type: "string",
        },
        {
          type: "blockObject",
          name: 'textContent',
        }
      ],
    }),
    defineField({
      name: 'courseCategories',
      title: 'Kurskategorier',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'courseExperts',
          fields: [
            defineField({
              name: 'chosenCourseCategory',
              title: 'Kurskategori',
              type: 'reference',
              to: [{type: 'courseCategory'}]
            }),
            {type: 'blockObject', name: 'description', title: 'Beskrivning'},
            defineField({
              name: 'courseList',
              title: 'Kursutbud',
              type: 'array',
              of: [
                {type: 'reference',
                  to: [{type: 'course'}]
                }
              ]
            })
          ],
          preview: {
            select: {
              categoryName:
                "chosenCourseCategory.title",
          
              lecturerFirstName:
                "chosenCourseCategory.courseLecturerSection.lecturer.firstName",
          
              lecturerLastName:
                "chosenCourseCategory.courseLecturerSection.lecturer.lastName",
          
              lecturerImage:
                "chosenCourseCategory.image",
            },
          
            prepare({
              categoryName,
              lecturerFirstName,
              lecturerLastName,
              lecturerImage,
            }) {
              const lecturerName = [
                lecturerFirstName,
                lecturerLastName,
              ]
                .filter(Boolean)
                .join(" ");
          
              return {
                title:
                  categoryName ||
                  "Ingen kurskategori vald",
          
                subtitle: lecturerName
                  ? `Kursledare: ${lecturerName}`
                  : "Ingen kursledare vald",
          
                media: lecturerImage,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'courseInfo',
      title: 'Kursinfo',
      type: 'object',
      fields: [
        {type: 'eyebrow', name: 'infoEyebrow'},
        {type: 'titleObject', name: 'info'},
        {type: 'blockObject', name: 'infoBody'}
      ]
    }),
    defineField({
      name: 'courseCategoryBlock',
      title: 'Kurskategori text',
      type: 'object',
      fields: [
        {type: 'eyebrow', name: 'infoEyebrow'},
        {type: 'titleObject', name: 'info'},
        {type: 'blockObject', name: 'infoBody'}
      ]
    }),
    defineField({
      name: 'slug',
      type: 'link',
      group: 'seo',
      title: 'Sidlänk',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      group: 'seo',
      name: 'seo',
      type: 'seo',
      title: 'SEO'
    }),
  ],
})