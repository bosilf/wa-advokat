import type {StructureResolver} from 'sanity/structure'
import StudioOverview from './StudioOverview'
import ServiceStructure from './ServiceStructure'
import CourseStructure from './CourseStructure'
import StudentStructure from './StudentStructure'
import ArticleStructure from './ArticleStructure'
import EmployeeStructure from './EmployeeStructure'
import {overviewDocumentChild} from './overviewDocumentChild'
import {
  LinkIcon,
  CogIcon,
  TagsIcon,
  UsersIcon,
  HomeIcon,
  DocumentTextIcon,
  CaseIcon,
  EnvelopeIcon,
  PresentationIcon,
  AddUserIcon,
  ComposeIcon,
} from '@sanity/icons'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Innehåll (WA Advokatbyrå)')
    .items([
      S.listItem()
        .id('overview')
        .title('Översikt')
        .child(S.component().id('overview').title('Översikt').component(StudioOverview)),
      S.listItem()
        .id('home')
        .title('Startsida')
        .icon(HomeIcon)
        .child(S.document().schemaType('home').documentId('home').title('Startsida')),
      S.listItem()
        .id('employees')
        .title('Medarbetare')
        .icon(UsersIcon)
        .child(
          S.component()
            .id('employees')
            .title('Medarbetare')
            .component(EmployeeStructure)
            .child(overviewDocumentChild(S)),
        ),
      S.listItem()
        .id('studentOverview')
        .title('Studentpoolen')
        .icon(AddUserIcon)
        .child(
          S.component()
            .id('studentOverview')
            .title('Studentpoolen')
            .component(StudentStructure)
            .child(overviewDocumentChild(S)),
        ),
      S.listItem()
        .id('serviceOverview')
        .title('Rättsområden')
        .icon(CaseIcon)
        .child(
          S.component()
            .id('serviceOverview')
            .title('Rättsområden')
            .component(ServiceStructure)
            .child(overviewDocumentChild(S)),
        ),
      S.listItem()
        .id('courseOverview')
        .title('Kurser')
        .icon(PresentationIcon)
        .child(
          S.component()
            .id('courseOverview')
            .title('Kurser')
            .component(CourseStructure)
            .child(overviewDocumentChild(S)),
        ),
      S.listItem()
        .id('articles')
        .title('Artiklar')
        .icon(ComposeIcon)
        .child(
          S.component()
            .id('articles')
            .title('Artiklar')
            .component(ArticleStructure)
            .child(overviewDocumentChild(S)),
        ),
      S.listItem()
        .id('contact')
        .title('Kontakt')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contactPage').documentId('contact-page').title('Kontakt')),
      S.listItem()
        .title('Sidor')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('page').title('Alla sidor')),
      S.divider(),
      S.listItem()
        .title('Navigering')
        .icon(LinkIcon)
        .child(S.document().schemaType('navigation').documentId('navigation').title('Navigering')),
      S.listItem()
        .title('Yrkestitlar')
        .icon(TagsIcon)
        .child(S.documentTypeList('role').title('Hantera yrkestitlar')),
      S.listItem()
        .title('Globala Inställningar & Färger')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('global-settings')),
    ])
