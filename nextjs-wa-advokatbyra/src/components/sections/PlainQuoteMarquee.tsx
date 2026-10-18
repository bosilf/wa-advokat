import type {ReactNode} from "react";
import QuoteMarquee from "./QuoteMarquee";

export default function PlainQuoteMarquee({children}: {children: ReactNode}) {
  return <QuoteMarquee stacked={false}>{children}</QuoteMarquee>;
}
