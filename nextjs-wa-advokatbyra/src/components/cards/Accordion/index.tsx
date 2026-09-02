// "use client"

// import { useState } from "react";
// import Icon from "@/components/Icon";
// import Button from "@/components/buttons/Button";
// import { ButtonData } from "@/sanity/types";

// export type AccordionData = {
//   title: string,
//   description: string,
//   b: ButtonData,
//   icon?: boolean,
//   btnHref: string,
// };

// export default function Accordion({ title, btnHref, description, icon = true, }: AccordionData) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="self-stretc w-full inline-flex flex-col justify-start items-start">
//       <div 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="text-left w-full flex items-center gap-6 cursor-pointer select-none py-2"
//       >
//         <h3 className="text-left flex-1 justify-start font-subheading text-ink">{title}</h3>
//         <figure className={`align-self-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
//           <Icon name="arrowSimple" />
//         </figure>
//       </div>
//       <div 
//         className={`w-full grid transition-all duration-600 ${
//           isOpen ? 'opacity-100 mt-4' : 'h-0 opacity-0 mt-0'
//         }`}
//       >
//         <div className="overflow-hidden">
//           <div className="w-full flex flex-col gap-md pb-2">
//             <p className="font-body">{description}</p>
//             { btnHref && 
//               <Button 
//                 href=""
//                 showIcon
//                 variant="primary"
//               >
//                 {title}
//               </Button>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

import Icon from "@/components/Icon";
import Button from "@/components/buttons/Button";

export type AccordionData = {
  title: string;
  description: string;
  icon?: boolean;
  btnHref?: string;
};

export default function Accordion({
  title,
  btnHref,
  description,
  icon = true,
}: AccordionData) {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="inline-flex w-full flex-col items-start justify-start self-stretch">
      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer select-none items-center gap-6 py-2 text-left"
      >
        <h3 className="flex-1 font-subheading text-ink">
          {title}
        </h3>

        <span
          className={`transition-transform duration-300 ${
            isOpen
              ? "rotate-180"
              : "rotate-0"
          }`}
        >
          <Icon name="arrowSimple" />
        </span>
      </button>

      <div
        className={`grid w-full transition-all duration-500 ${
          isOpen
            ? "mt-4 opacity-100"
            : "h-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex w-full flex-col gap-md pb-2">
            <p className="font-body">
              {description}
            </p>

            {btnHref && (
              <Button
                href={btnHref}
                variant="simple"
                icon="arrow"
                showIcon={icon}
              >
                Mer om: {title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}