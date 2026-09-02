import type { StructureResolver } from "sanity/structure"
import {
  LinkIcon,
  CogIcon,
  TagsIcon,
  UsersIcon,
  StackCompactIcon,
  HomeIcon,
  DocumentTextIcon,
  CaseIcon,
  FolderIcon,
  EnvelopeIcon,
  PresentationIcon,
  AddUserIcon,
  TaskIcon,
  ComposeIcon
} from "@sanity/icons"


export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll (WA Advokatbyrå)")
    .items([
      // --------------------------------
      // HUVUDSIDOR
      // --------------------------------

      S.listItem()
        .title("Huvudsidor")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Huvudsidor")
            .items([
              S.listItem()
                .title("Startsida")
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType("home")
                    .documentId("home")
                ),

              S.listItem()
                .title("Om oss")
                .icon(UsersIcon)
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("about-page")
                ),

              S.listItem()
                .title("Rättsområden")
                .icon(CaseIcon)
                .child(
                  S.document()
                    .schemaType("servicesPage")
                    .documentId("services-page")
                ),

              S.listItem()
                .title("Juridikkurser")
                .icon(PresentationIcon)
                .child(
                  S.document()
                    .schemaType("courseMainPage")
                    .documentId("course-main-page")
                ),

              S.listItem()
                .title("Kontakt")
                .icon(EnvelopeIcon)
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contact-page")
                ),
              S.listItem()
                .title("Boka kurs")
                .icon(TaskIcon)
                .child(
                  S.document()
                    .schemaType("bookCoursePage")
                    .documentId("book-course-page")
                ),
              S.listItem()
                .title("Artiklar samlingssida")
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .schemaType("articleMainPage")
                    .documentId("article-main-page")
                ),
            ])
        ),

      // --------------------------------
      // CONTENT COLLECTIONS
      // --------------------------------

      S.listItem()
        .title("Medarbetare")
        .icon(AddUserIcon)
        .child(
          S.documentTypeList("employee")
            .title("Alla Medarbetare")
        ),

      S.listItem()
        .title("Rättsområden")
        .icon(CaseIcon)
        .child(
          S.documentTypeList("service")
            .title("Alla Rättsområden")
        ),

      S.listItem()
        .title("Sidor")
        .icon(CaseIcon)
        .child(
          S.documentTypeList("page")
            .title("Alla Sidor")
        ),

      S.listItem()
        .title("Kurser")
        .icon(PresentationIcon)
        .child(
          S.documentTypeList("course")
            .title("Alla Kurser")
          ),
          S.listItem()
          .title("Kurskategorier")
          .icon(PresentationIcon)
          .child(
            S.documentTypeList('courseCategory')
            .title("Kurskategorier")
        ),

      S.listItem()
        .title("Artiklar")
        .icon(ComposeIcon)
        .child(
          S.documentTypeList("article")
            .title("Alla Artiklar")
        ),

      S.divider(),

      // --------------------------------
      // GLOBAL / REUSABLE
      // --------------------------------

      S.listItem()
        .title("Navigering")
        .icon(LinkIcon)
        .child(
          S.document()
            .schemaType("navigation")
            .documentId("navigation")
            .title("Navigering")
        ),

      S.listItem()
        .title("Yrkestitlar")
        .icon(TagsIcon)
        .child(
          S.documentTypeList("role")
            .title("Hantera Yrkestitlar")
        ),



      S.listItem()
        .title("Globala Inställningar & Färger")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("global-settings")
        ),
    ])