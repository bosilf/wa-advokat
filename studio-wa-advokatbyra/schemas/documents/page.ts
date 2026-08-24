import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity' 

export default defineType({ 
  name: 'page',
  title: 'Undersidor (Sidor)',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Innehåll (Editorial)',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sidans rubrik',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    
    defineField({
      name: 'slug',
      title: 'Webbadress (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Beskrivning',
      type: 'text',
      description: 'Beskrivningen som syns på Google vid sökning.',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { title, slug } = selection
      return {
        title: title,
        subtitle: slug ? `/${slug}` : 'Saknar adress',
        media: DocumentIcon,
      }
    },
  },
})