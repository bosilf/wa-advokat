import {forwardRef, useState, type ComponentProps} from 'react'
import {usePaneRouter} from 'sanity/structure'
import type {IntentLink} from 'sanity/router'

/** Open an editor beside the overview, preserving its expanded groups. */
const PaneDocumentLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof IntentLink>>(
  function PaneDocumentLink({intent, params, onClick, ...rest}, ref) {
    const {ChildLink} = usePaneRouter()
    const [newId, setNewId] = useState(() => intent === 'create' ? crypto.randomUUID() : '')
    const [parameters, payload] = Array.isArray(params) ? params : [params, undefined]
    const childParameters = Object.fromEntries(
      Object.entries(parameters ?? {}).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
    )
    const id = intent === 'create' ? newId : parameters?.id

    if (!id) return null

    const linkProps = {
      ...rest,
      ref,
      childId: id.replace(/^drafts\./, ''),
      childParameters,
      childPayload: payload,
      onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event)
        if (intent === 'create' && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          setNewId(crypto.randomUUID())
        }
      },
    }
    return <ChildLink {...linkProps} />
  },
)

export default PaneDocumentLink
