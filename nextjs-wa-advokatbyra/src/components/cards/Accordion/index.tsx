"use client";

import { ReactNode, useState } from "react";

import Icon from "@/components/Icon";
import Button from "@/components/buttons/Button";
import { CustomPortableText } from "@/components/common/CustomPortableText";

export type AccordionData = {
  title: string;
  description?: ReactNode | string;
  icon?: boolean;
  btnHref?: string;
  noAccordionPadding?: boolean;
  linkList?: ReactNode,
};

export default function Accordion({
  title,
  btnHref,
  description,
  linkList,
  noAccordionPadding = false,
  icon = true,
}: AccordionData) {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className={`${noAccordionPadding ? "lg:-mt-sm lg:-pt-sm lg:px-sm" : ""} inline-flex w-full flex-col items-start justify-start self-stretch`}>
      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        className="flex w-full group cursor-pointer select-none items-center gap-md py-sm text-left"
      >
        <h3 className="group-active:text-accent group-hover:text-accent transform-all duration-100 flex-1 font-subheading text-ink">
          {title}
        </h3>
        <Icon 
          className={`
            group-hover:text-accent 
            group-active:text-accent 
            transform-all 
            duration-100
            ${isOpen
            ? "rotate-180 group-hover:mb-sm"
            : "rotate-0 group-hover:mt-sm"}
          `} 
          name="arrowSimple" 
        />
      </button>

      <div
        className={`grid w-full transition-all duration-500 ${
          isOpen
            ? "mt-4 opacity-100"
            : "h-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden mb-md">
          <div className="section-spacing">
            {description && (
              <div className="font-body text-body">
                {description}
              </div>
            )}
            {linkList}
            {btnHref && (
              <Button
                href={btnHref}
                variant="simple"
                showIcon={false}
              >
                Till {title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}