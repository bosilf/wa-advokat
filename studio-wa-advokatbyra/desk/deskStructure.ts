import { StructureResolver } from 'sanity/structure'
import { CogIcon, TagIcon, UsersIcon, MenuIcon, HomeIcon, DocumentIcon, DocumentTextIcon, AddUserIcon, CaseIcon } from '@sanity/icons'

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
        ),
        S.listItem()
        .title('Tjänster')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('tjanster')
            .title('Alla Tjänster')
        ),
        S.listItem()
        .title('Artiklar')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('article')
            .title('Alla Artiklar')
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
      
      S.listItem()
        .title('Huvudsidor')
        .child(
          S.documentTypeList('article')
            .title('Alla Artiklar')
        ),
      S.divider(), 

      // 4. SAMLAD LISTA FÖR YRKESTITLAR 🚀
      S.listItem()
        .title('Yrkestitlar')
        .icon(TagIcon)
        .child(
          S.documentTypeList('role')
            .title('Hantera Yrkestitlar')
            .defaultLayout('default') 
        ),

      // 5. GLOBALA INSTÄLLNINGAR & FÄRGER (Singleton)
      S.listItem()
        .title('Globala Inställningar & Färger')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('global-settings')
        ),
    ])
