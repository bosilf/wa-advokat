import { ReactNode } from "react";
import ImageBlurText from "../ImageBlurText";
import TeamCardSmall from "../TeamCardSmall";
import Accordion from "../Accordion";

export type AccordionItemData = {
  title: string;
  description: string;
  btnHref?: string;
  icon?: boolean;
};

export type CardProps = {
  descriptionText?: string;
  accordions?: AccordionItemData[];
  hideAccordion?: boolean;
  hideImage?: boolean;
  hideCardSmall?: boolean;
  hideDescription?: boolean;
  children?: ReactNode;
};

const CardContainer = ({
  descriptionText,
  accordions = [],
  hideAccordion = false, 
  hideCardSmall = false, 
  hideImage = false, 
  hideDescription = false, 
  children
}: CardProps) => {

  return (
    <article className="w-full bg-white rounded-lg flex-col justify-start items-center overflow-hidden">
      <ImageBlurText hide={hideImage} />
      <TeamCardSmall hide={hideCardSmall} />
      
      {!hideDescription && descriptionText && (
        <p className="flex-1 p-md justify-center font-body leading-8">
          {descriptionText || ""}
        </p>
      )}
      
      {/* {!hideAccordion && hideDescription && accordions.length > 0 && (
        <hr className="bg-border" />
      )} */}
      
      {!hideAccordion && accordions?.length > 0 && (
        <ul className="p-md flex flex-col gap-4">
          {accordions.map((item, index) => (
            <li key={index}>
              <Accordion title={item.title || ""} btnHref={item.btnHref || ""} description={item.description} b={{title: "test", variant: 'secondary', href: item.btnHref || "", hasIcon: true}}  />
            </li>
          ))}
        </ul>
      )}
      {children}
    </article>
  );
};

export default CardContainer;