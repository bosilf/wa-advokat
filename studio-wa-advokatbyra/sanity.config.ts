import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { media } from 'sanity-plugin-media'
import { BookIcon, FolderIcon, UsersIcon, HomeIcon, DocumentsIcon, CogIcon } from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'wa-advokatbyrå',

  projectId: '9pn4td6w',
  dataset: 'production',

  plugins: [
    visionTool(),
    media(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innehåll')
          .items([
            // S.listItem()
            //   .title('Info WA Advokat')
            //   .icon(CogIcon)
            //   .id('company')
            //   .child(
            //     S.document()
            //       .schemaType('company')
            //       .documentId('company')
            //       .title('Redigera Info WA Advokat')
            //   ),
            // 1. Förstasidan (Singleton)
            S.listItem()
              .title('Förstasidan')
              .icon(HomeIcon)
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
                  .title('Redigera Förstasidan')
              ),

            S.divider(),

            // 2. Vanliga listor
            S.documentTypeListItem('company').title('Info WA Advokat').icon(DocumentsIcon),
            S.documentTypeListItem('post').title('Poster').icon(DocumentsIcon),
            S.documentTypeListItem('employee').title('Medarbetare').icon(UsersIcon),

            S.divider(),

            // 3. DIN NYA DYNAMISKA LISTA (Mapp-systemet)
            S.listItem()
              .title('Kurskategorier lägg till / ändra kurser')
              .icon(BookIcon)
              .child(
                S.documentTypeList('courseCategory') // Hämtar dina kategoridokument
                  .title('Välj kategori')
                  .child((categoryId) =>
                    S.documentList()
                      .title('Kurser')
                      // ÄNDRING: Filtrerar kurser baserat på vald kategoris ID
                      .filter('_type == "course" && category._ref == $categoryId')
                      .params({ categoryId })
                      // ÄNDRING: Gör att "+" knappen inuti mappen fungerar
                      .initialValueTemplates([
                        S.initialValueTemplateItem('course-by-category', { categoryId }),
                      ])
                  )
              ),

            S.divider(),

            // 4. Hantera själva kategorierna (Skapa/Ändra namnen på mapparna)
            S.documentTypeListItem('courseCategory')
              .title('Kurskategorier lägg till / ändra')
              .icon(FolderIcon),

            S.divider(),

            // Filtrerar bort dokumenttyper som redan visas ovan
            ...S.documentTypeListItems().filter(
              (listItem) => !['post', 'employee', 'homepage', 'course', 'courseCategory', 'company',].includes(listItem.getId()!)
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // ÄNDRING: Mallen som krävs för att initialValueTemplates ska fungera
    templates: (prev) => [
      ...prev,
      {
        id: 'course-by-category',
        title: 'Kurs efter kategori',
        schemaType: 'course',
        parameters: [{ name: 'categoryId', type: 'string' }],
        value: (params: any) => ({
          category: {
            _type: 'reference',
            _ref: params.categoryId,
          },
        }),
      },
    ],
  },
})

