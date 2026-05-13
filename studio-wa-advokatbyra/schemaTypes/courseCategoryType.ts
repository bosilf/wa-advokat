import {defineField, defineType} from 'sanity'

export const courseCategoryType = defineType({
  name: 'courseCategory',
  title: 'Utbildningskategori',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Kategorinamn' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text', title: 'Beskrivning av kategorin' }),
  ],
})
