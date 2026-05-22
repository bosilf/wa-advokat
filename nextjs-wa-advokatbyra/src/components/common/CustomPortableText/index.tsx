import { PortableText } from "next-sanity";

const components = {
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-6 space-y-2 mb-4 text-black-300 marker:text-blue-500">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-6 space-y-2 mb-4 text-black-300 marker:text-blue-500 marker:font-bold">
        {children}
      </ol>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-black-300 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-blue-400 underline hover:text-blue-300 transition-colors">
        {children}
      </a>
    ),
  },
};

export function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
