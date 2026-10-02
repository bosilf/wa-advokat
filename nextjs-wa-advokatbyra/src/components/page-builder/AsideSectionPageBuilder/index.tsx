import RichTextBlock from "../blocks/RichTextBlock";
import ImageBlock from "../blocks/ImageBlock";
import ButtonGroupBlock from "../blocks/ButtonGroupBlock";
import EmployeeGridBlock from "../blocks/EmployeeGridBlock";
import ServiceGridBlock from "../blocks/ServiceGridBlock";
import AccordionBlock from "../blocks/AccordionBlock";
import CourseSection from "@/components/sections/CourseSection";

type PageBuilderProps = {
  sections: Array<any>;
};

export default function AsideSectionPageBuilder({
  sections,
}: PageBuilderProps) {
  return sections.map((section, index) => (
    <CourseSection
      key={section._key}
      heading={section.heading ?? ""}
      eyebrow={section.eyebrow?.text}
      color={index % 2 === 0 ? "bg-surface" : "bg-canvas"}
    >
      {section.blocks?.map((block: any) => {
        switch (block._type) {
          case "richTextBlock":
            return (
              <RichTextBlock
                key={block._key}
                block={block}
              />
            );

          case "imageBlock":
            return (
              <ImageBlock
                key={block._key}
                block={block}
              />
            );

          case "buttonGroupBlock":
            return (
              <ButtonGroupBlock
                key={block._key}
                block={block}
              />
            );

          case "employeeGridBlock":
            return (
              <EmployeeGridBlock
                key={block._key}
                block={block}
              />
            );

          case "serviceGridBlock":
            return (
              <ServiceGridBlock
                key={block._key}
                block={block}
              />
            );

          case "accordionBlock":
            return (
              <AccordionBlock
                key={block._key}
                block={block}
              />
            );

          default:
            return null;
        }
      })}
    </CourseSection>
  ));
}