import Icon from "@/components/Icon";
import Link from "next/link";

type ServiceCardData = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
};

export type ServiceGridBlockData = {
  _key: string;
  _type: "serviceGridBlock";
  services?: ServiceCardData[] | null;
};

type ServiceGridBlockProps = {
  block: ServiceGridBlockData;
};

export default function ServiceGridBlock({
  block,
}: ServiceGridBlockProps) {
  const services = block.services ?? [];

  if (services.length === 0) {
    return (
      <p className="font-body text-muted">
        Inga rättsområden har valts.
      </p>
    );
  }

  return (
    <ul className="grid gap-lg md:grid-cols-2">
      {services.map((service) => {
        if (!service.slug) {
          return null;
        }

        return (
          <li key={service._id}>
            <Link
              href={service.slug}
              className="flex h-full flex-col gap-sm"
            >
              <h3 className="font-subheading text-ink flex gap-md transition-all hover:gap-lg duration-300 hover:text-accent">
                {service.title ??
                  "Namnlöst rättsområde"}
              <Icon name="arrow" size="" className="hover:text-accent" />
              </h3>

              {service.excerpt && (
                <p className="font-body text-body">
                  {service.excerpt}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}