import { PortableText } from "@portabletext/react";

const components = {
  list: {
    bullet: ({ children }: any) => (
      <ul className="font-body list-disc ml-6 space-y-2 mb-4 text-body marker:text-blue-500">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className=" list-decimal ml-6 space-y-2 mb-4 text-body marker:text-blue-500 marker:font-bold">
        {children}
      </ol>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="font-body mb-4 text-body leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-ink font-bodybold hover:text-blue-300 transition-colors">
        {children}
      </a>
    ),
  },
};

export function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
