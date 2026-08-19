import { ReactNode } from "react"

export type props = {
  children: ReactNode,
  color?: string,
  hideEyebrow?: boolean,
  eyebrow?: string,
  heading: string,
}

export default function Section({ 
  heading, 
  eyebrow, 
  hideEyebrow, 
  children, 
  color = "bg-canvas" 
}: props) {
  return (
    <section className={`${color} justify-center h-fit w-screen`}>
      <div className="m-auto max-w-200 flex flex-col py-xl px-section-sides gap-md">
        <h2 className="flex flex-col mb-md">
          <span hidden={hideEyebrow} className="font-eyebrow text-muted">{eyebrow}</span>
          <span className="font-section-heading text-ink">{heading}</span>
        </h2>
        {children}
      </div>
    </section>
  )
}