import { ReactNode, ComponentProps } from "react";
import ImageBlurText, { ImageBlurProps } from "../ImageBlurText";
import Accordion from "../Accordion";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { CustomPortableText } from "@/components/common/CustomPortableText";
import Button, { ButtonProps } from "@/components/buttons/Button";

export type AccordionItemData = {
  _key?: string;
  title?: string | null;
  description?: ReactNode | string | null;
  btnHref?: string | null;
  icon?: boolean | null;
};

type EmployeeData = {
  name: string;
  role?: string;
  imageSrc?: string;
  slug?: string
};

type Links = {
  _id: string;
  title: string;
  href: string;
};

type PortableTextValue =
  ComponentProps<typeof CustomPortableText>["value"];

export type CardProps = {
  description?: PortableTextValue | string | null;
  accordions?: AccordionItemData[];
  hasAccordion?: boolean;
  noAccordionPadding?: boolean;
  employee?: EmployeeData;
  links?: Links[];
  image?: ImageBlurProps | null,
  hasImage?: boolean;
  hasCardSmall?: boolean;
  hasDescription?: boolean;
  hasButton?: boolean,
  button?: ButtonProps | null,
  bg?: string,
};

const CardContainer = ({
  description,
  accordions = [],
  hasAccordion = false,
  noAccordionPadding = false,
  employee,
  hasCardSmall = false,
  links = [],
  image,
  hasImage = false,
  hasDescription = false,
  hasButton = false,
  button,
  bg,
}: CardProps) => {

  return (
    <article className={`flex w-full h-fit flex-col overflow-hidden ${noAccordionPadding ? "rounded-lg lg:rounded-0" : "rounded-lg"}  ${bg || 'bg-white'}`}>
      {hasImage && image?.src && (
        <ImageBlurText
          src={image.src}
          eyebrow={image.eyebrow}
          title={image.title}
        />
      )}
  
      {hasCardSmall && employee && (
        <div className="flex items-center gap-sm px-lg py-md">
          {employee.imageSrc && (
            <Image
              src={employee.imageSrc}
              alt={employee.name}
              width={50}
              height={50}
              className="size-12 rounded-full object-cover"
            />
          )}
  
          <div>
            <Link href={employee?.slug || "/"} >
              <h4 className="font-subheading text-ink">
                {employee.name}
              </h4>
            </Link>
  
            {employee.role && (
              <p className="font-caption capitalize text-body">
                {employee.role}
              </p>
            )}
          </div>
        </div>
      )}

      {hasDescription && description && (
        <div className="section-spacing p-md">
          <CustomPortableText value={description} />
          {hasButton && hasDescription && (
            <Button 
              href={button?.href || "/"} 
              variant={button?.variant || 'primary'}
              showIcon={button?.showIcon}
              icon={button?.icon || "arrow"}
              ariaLabel={button?.ariaLabel}
              download={button?.download}
              target={button?.target}
            >
              {button?.children}
            </Button>
          )}
        </div>
      )}
  
      {links.length > 0 && (
        <details className="group border-t border-ink/20">
          <summary className="flex cursor-pointer list-none items-center justify-between px-lg py-lg font-subheading font-semibold [&::-webkit-details-marker]:hidden">
            <span>Se kursutbud</span>
            <Icon name="arrowSimple" />
          </summary>
  
          <ul className="flex flex-col gap-sm px-lg pb-lg">
            {links.map((link) => (
              <li key={link._id}>
                <Link
                  href={link.href}
                  className="font-body text-ink underline-offset-4 hover:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}
  
      {hasAccordion &&
        accordions.length > 0 && (
          <ul className={`${noAccordionPadding ? "p-md lg:p-0 lg:-mt-sm" : "p-md"} gap-sm flex flex-col`}>
            {accordions.map((item) => (
              <li key={item._key}>
                <Accordion
                  noAccordionPadding={noAccordionPadding}
                  title={item.title ?? ""}
                  btnHref={item.btnHref ?? ""}
                  description={
                    item.description ?? ""
                  }
                  linkList={links.map((link) => (
                    <li key={link._id}>
                      <Link
                        href={link.href}
                        className="font-body text-ink underline-offset-4 hover:underline"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                  icon={item.icon ?? true}
                />
              </li>
            ))}
          </ul>
        )}
    </article>
  );
};

export default CardContainer;