import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const courseCategories = defineType({
  name: 'courseCategory',
  title: 'Utbildningskategori',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Kategorinamn' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text', title: 'Beskrivning av kategorin' }),
  ],
})