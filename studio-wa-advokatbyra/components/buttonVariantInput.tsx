import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  Card,
  Flex,
  Stack,
  Text,
} from "@sanity/ui";

import {
  set,
  type StringInputProps,
  useFormValue,
} from "sanity";

const variants = [
  {
    title: "Primär",
    value: "primary",
  },
  {
    title: "Sekundär",
    value: "secondary",
  },
  {
    title: "Enkel textlänk",
    value: "simple",
  },
  {
    title: "Enkel textlänk – ljus",
    value: "simpleWhite",
  },
] as const;

type ButtonVariant =
  (typeof variants)[number]["value"];

type ButtonValue = {
  link?: {
    label?: string;
  };
};

export default function ButtonVariantInput(
  props: StringInputProps,
) {
  const {
    value,
    onChange,
    readOnly,
    path,
  } = props;

  // The current field is `variant`.
  // Removing the final path segment gives us the complete button object.
  const buttonValue = useFormValue(
    path.slice(0, -1),
  ) as ButtonValue | undefined;

  const previewLabel =
    buttonValue?.link?.label?.trim() ||
    "Läs mer";

  return (
    <Stack space={3}>
      {variants.map((variant) => {
        const selected =
          value === variant.value;

        return (
          <Card
            key={variant.value}
            padding={4}
            radius={3}
            shadow={selected ? 2 : 1}
            tone={
              selected
                ? "primary"
                : "default"
            }
            role="radio"
            aria-checked={selected}
            aria-disabled={readOnly}
            style={{
              cursor: readOnly
                ? "default"
                : "pointer",
            }}
            onClick={() => {
              if (readOnly || selected) return;

              onChange(set(variant.value));
            }}
          >
            <Flex
              align="center"
              justify="space-between"
              gap={4}
            >
              <Text
                size={1}
                weight="semibold"
              >
                {variant.title}
              </Text>

              <ButtonPreview
                variant={variant.value}
              >
                {previewLabel}
              </ButtonPreview>
            </Flex>
          </Card>
        );
      })}
    </Stack>
  );
}

function ButtonPreview({
  variant,
  children,
}: {
  variant: ButtonVariant;
  children: ReactNode;
}) {
  const styles: Record<
    ButtonVariant,
    CSSProperties
  > = {
    primary: {
      background: "#1A1A1A",
      color: "#FFFFFF",
      borderRadius: "999px",
      padding: "10px 18px",
      border: "1px solid #222222",
    },

    secondary: {
      background: "transparent",
      color: "#1A1A1A",
      borderRadius: "999px",
      padding: "10px 18px",
      border: "1px solid #222222",
    },

    simple: {
      background: "transparent",
      color: "#1A1A1A",
      padding: "4px 0",
      border: "none",
      borderBottom: "2px solid #222222",
    },

    simpleWhite: {
      background: "transparent",
      color: "#FFFFFF",
      padding: "4px 0",
      border: "none",
      borderBottom: "2px solid #FFFFFF",
    },
  };

  const needsDarkBackground =
    variant === "simpleWhite";

  return (
    <span
      style={{
        display: "inline-flex",
        background: needsDarkBackground
          ? "#1A1A1A"
          : "transparent",
        borderRadius: needsDarkBackground
          ? "6px"
          : undefined,
        padding: needsDarkBackground
          ? "10px 14px"
          : undefined,
      }}
    >
      <span style={styles[variant]}>
        {children}
      </span>
    </span>
  );
}