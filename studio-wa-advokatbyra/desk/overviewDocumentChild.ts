import type {StructureBuilder} from 'sanity/structure'

/** Resolve the document opened to the right of a custom overview. */
export function overviewDocumentChild(S: StructureBuilder) {
  return (id: string, {params}: {params: Record<string, string | undefined>}) => {
    if (!params.type) return undefined
    const document = S.document().id(id).documentId(id).schemaType(params.type)
    return params.template ? document.initialValueTemplate(params.template) : document
  }
}
