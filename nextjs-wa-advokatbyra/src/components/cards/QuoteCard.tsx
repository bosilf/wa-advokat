import Link from "next/link";
import Icon from "../Icon";

type CourseTakenTypes = {
  slug?: string,
  name: string,
}

type QuoteProps = {
  quote: string,
  person: string,
  course: CourseTakenTypes
}

export default function QuoteCard({ quote, person, course }: QuoteProps) {
  return (
    <div className="border border-footer drop-shadow-lg/30 min-w-70 relative bg-footer cursor-default font-sans flex flex-col gap-2 p-4 text-white rounded-2xl overflow-visible">
      <Icon name="doubleQuotes" size={40} className="mix-blend-lighten text-white mb-auto mr-auto" />
      <blockquote className="flex-1 text-sm text-white">
        <p>{quote}</p>
      </blockquote>
      <p className="text-white first-letter:uppercase">{person}{course.name && <>{", "}{course.slug ? <Link className="font-semibold hover:underline first-letter:uppercase" href={course.slug}>{course.name}</Link> : <span className="font-semibold">{course.name}</span>}</>}</p>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/paper-texture.svg')] bg-size-[125px_125px] bg-repeat mix-blend-multiply opacity-50 rounded-2xl" />
    </div>
  )
}