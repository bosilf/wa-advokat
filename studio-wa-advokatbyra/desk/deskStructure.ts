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
  AddUserIcon
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
                    .schemaType("employeesPage")
                    .documentId("employees-page")
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
                    .schemaType("coursesPage")
                    .documentId("courses-page")
                ),

              S.listItem()
                .title("Kontakt")
                .icon(EnvelopeIcon)
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contact-page")
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
        .title("Tjänster")
        .icon(CaseIcon)
        .child(
          S.documentTypeList("tjanster")
            .title("Alla Tjänster")
        ),

      S.listItem()
        .title("Kurser")
        .icon(PresentationIcon)
        .child(
          S.documentTypeList("course")
            .title("Alla Kurser")
        ),

      S.listItem()
        .title("Artiklar")
        .icon(DocumentTextIcon)
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
        .title("Dragspel")
        .icon(StackCompactIcon)
        .child(
          S.documentTypeList("accordions")
            .title("Hantera Dragspel")
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