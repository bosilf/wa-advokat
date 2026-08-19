import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity' // Importera defineType för dokument

export default defineType({ // Ändrat till defineType eftersom det är ett huvuddokument
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
    // 1. Sidans interna namn
    defineField({
      name: 'title',
      title: 'Sidans rubrik',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    
    // 2. Sidans webbadress (Slug)
    defineField({
      name: 'slug',
      title: 'Webbadress (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    // 3. Moduler – HÄR PLUGGAR VI IN DINA EGNA RENA MODULER!
    // defineField({
    //   name: 'modules',
    //   title: 'Sidans innehållsblock',
    //   type: 'array',
    //   description: 'Stapla dina block i den ordning du vill att de ska visas på sidan.',
    //   group: 'editorial',
    //   of: [
    //     { type: 'cardContainer' }, // 🚀 Här kan administratören lägga till ditt kort med dragspel!
    //     // Du kan lägga till fler typer här i framtiden, t.ex. { type: 'heroHome' }
    //   ],
    // }),

    // 4. Enkel SEO (Vi byter ut den trasiga seo.page mot en vanlig string så länge)
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