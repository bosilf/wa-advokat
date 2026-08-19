import { StructureResolver } from 'sanity/structure'
import { CogIcon, TagIcon, UsersIcon, MenuIcon, HomeIcon, DocumentIcon, AddUserIcon } from '@sanity/icons'
import { title } from 'process'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Innehåll (WA Advokatbyrå)')
    .items([
      // 1. STARTSIDA (Singleton)
      S.listItem()
        .title('Startsida')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('home')
            .documentId('home')
        ),

        S.listItem()
        .title('Medarbetare')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('employee')
            .title('Alla Medarbetare')
            .initialValueTemplates([
              S.initialValueTemplateItem('employee')
                .title('Lägg till medarbetare')          
            ])
        ),
      S.listItem()
        .title('Menyer')
        .icon(MenuIcon)
        .child(
          S.document()
          .schemaType('menu')
          .documentId('menu')
          .title('TITLE')
        ),
      // S.listItem()
      //   .title('Section')
      //   .icon(UserIcon)
      //   .child(S.documentTypeList('section').title('Alla sectioner')),

      S.divider(), // Ett snyggt streck i menyn för att separera grundinnehåll från inställningar

      // 4. SAMLAD LISTA FÖR YRKESTITLAR 🚀
      // Detta öppnar en hel lista med alla yrkesroller direkt på skärmen för snabbredigering!
      S.listItem()
        .title('Yrkestitlar')
        .icon(TagIcon)
        .child(
          S.documentTypeList('role')
            .title('Hantera Yrkestitlar')
            // Detta gör att du får en lista till vänster och redigeringsrutan direkt till höger
            .defaultLayout('default') 
        ),

      // 5. GLOBALA INSTÄLLNINGAR & FÄRGER (Singleton)
      // S.listItem()
      //   .title('Globala Inställningar & Färger')
      //   .icon(CogIcon)
      //   .child(
      //     S.document()
      //       .schemaType('settings')
      //       .documentId('global-settings')
      //   ),
    ])
