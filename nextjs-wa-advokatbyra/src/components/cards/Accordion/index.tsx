"use client"

import { useState } from "react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { ButtonData } from "@/sanity/types";

export type AccordionData = {
  title: string,
  description: string,
  b: ButtonData,
  icon?: boolean,
  btnHref: string,
};

export default function Accordion({ title, btnHref, description, icon = true, }: AccordionData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="self-stretc w-full inline-flex flex-col justify-start items-start">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-left w-full flex items-center gap-6 cursor-pointer select-none py-2"
      >
        <h3 className="text-left flex-1 justify-start font-subheading text-ink">{title}</h3>
        <figure className={`align-self-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <Icon name="arrowSimple" />
        </figure>
      </div>
      <div 
        className={`w-full grid transition-all duration-600 ${
          isOpen ? 'opacity-100 mt-4' : 'h-0 opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="w-full flex flex-col gap-md pb-2">
            <p className="font-body">{description}</p>
            { btnHref && 
              <Button 
                href=""
                showIcon
                variant="primary"
              >
                {title}
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}