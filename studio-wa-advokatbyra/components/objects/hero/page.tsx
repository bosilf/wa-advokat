import {defineField} from 'sanity'

export default defineField({
  name: 'hero.page',
  title: 'Page hero',
  type: 'object',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
    }),
    // Content
  ],
})
