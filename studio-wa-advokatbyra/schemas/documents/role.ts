import { TagIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'
// import RolePreview from '../../components/RolePreview'

export const role = defineType({
  name: 'role',
  title: 'Yrkestitlar',
  type: 'document',
  icon: TagIcon,
  
  // 🟢 2. Koppla på förhandsvisningen till din externa fil!
  // components: {
  //   preview: RolePreview
  // },

  fields: [
    
    defineField({
      name: 'title',
      title: 'Yrkestitel',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'colorPicker',
      title: 'välj färg',
      type: 'color',
      validation: Rule => Rule.required(),
    }),
  ],
})