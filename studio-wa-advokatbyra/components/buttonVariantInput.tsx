import {
  Card,
  Flex,
  Stack,
  Text,
} from "@sanity/ui"

import {
  set,
  unset,
  type StringInputProps,
} from "sanity"

const variants = [
  {
    title: "Primary",
    value: "primary",
  },
  {
    title: "Secondary",
    value: "secondary",
  },
  {
    title: "Text länk",
    value: "simple",
  },
] as const

export default function ButtonVariantInput(
  props: StringInputProps
) {
  const {
    value,
    onChange,
    readOnly,
  } = props

  return (
    <Stack space={3}>
      {variants.map((variant) => {
        const selected = value === variant.value

        return (
          <Card
            key={variant.value}
            padding={4}
            radius={3}
            shadow={selected ? 2 : 1}
            tone={selected ? "primary" : "default"}
            style={{
              cursor: readOnly ? "default" : "pointer",
            }}
            onClick={() => {
              if (readOnly) return

              onChange(
                variant.value
                  ? set(variant.value)
                  : unset()
              )
            }}
          >
            <Flex
              align="center"
              justify="space-between"
              gap={4}
            >
              <Text size={1} weight="semibold">
                {variant.title}
              </Text>

              <ButtonPreview
                variant={variant.value}
              >
                Läs mer
              </ButtonPreview>
            </Flex>
          </Card>
        )
      })}
    </Stack>
  )
}

function ButtonPreview({
  variant,
  children,
}: {
  variant: "primary" | "secondary" | "simple"
  children: React.ReactNode
}) {
  const styles: Record<
    typeof variant,
    React.CSSProperties
  > = {
    primary: {
      background: "#1A1A1A",
      color: "#fff",
      borderRadius: "999px",
      padding: "10px 18px",
      border: "1px solid #222",
    },

    secondary: {
      background: "transparent",
      color: "#1A1A1A",
      borderRadius: "999px",
      padding: "10px 18px",
      border: "1px solid #222",
    },

    simple: {
      background: "transparent",
      color: "#1A1A1A",
      padding: "4px 0",
      border: "none",
      borderBottom: "2px solid #222",
    },
  }

  return (
    <span style={styles[variant]}>
      {children}
    </span>
  )
}