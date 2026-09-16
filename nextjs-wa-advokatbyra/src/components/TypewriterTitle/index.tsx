"use client";
import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

const DEFAULT_WORDS = [
  "entreprenadrätt",
  "offentlig upphandling",
];

type TypewriterTitleProps = {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export default function TypewriterTitle({
  words = DEFAULT_WORDS,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
}: TypewriterTitleProps) {
  const availableWords = useMemo(
    () => words.filter(Boolean),
    [words],
  );

  const [wordIndex, setWordIndex] =
    useState(0);

  const [displayedText, setDisplayedText] =
    useState("");

  const [isDeleting, setIsDeleting] =
    useState(false);

  const currentWord =
    availableWords[
      wordIndex % availableWords.length
    ] ?? "";

  const longestWord = useMemo(
    () =>
      availableWords.reduce(
        (longest, word) =>
          word.length > longest.length
            ? word
            : longest,
        "",
      ),
    [availableWords],
  );

  useEffect(() => {
    if (!currentWord) return;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedText(currentWord);
      return;
    }

    let timeout:
      | ReturnType<typeof setTimeout>
      | undefined;

    if (
      !isDeleting &&
      displayedText === currentWord
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (
      isDeleting &&
      displayedText === ""
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(false);

        setWordIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            availableWords.length,
        );
      }, 250);
    } else {
      timeout = setTimeout(() => {
        const nextLength = isDeleting
          ? displayedText.length - 1
          : displayedText.length + 1;

        setDisplayedText(
          currentWord.slice(
            0,
            Math.max(0, nextLength),
          ),
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [
    availableWords.length,
    currentWord,
    deletingSpeed,
    displayedText,
    isDeleting,
    pauseDuration,
    typingSpeed,
  ]);

  if (!availableWords.length) {
    return null;
  }

  return (
    <span className="inline-grid max-w-full min-w-0">
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1"
      >
        {longestWord}
      </span>

      <span
        aria-hidden="true"
        className="col-start-1 row-start-1"
      >
        <Link className="hover:bg-footer/70 -ml-sm pl-sm animate-bounce transition-all duration-100" href={currentWord === "offentlig upphandling" ? "/juridikkurser/offentlig-upphandling" : "/juridikkurser/entreprenadjuridik/" }>
        {displayedText}

        <span
          className="
          ml-[0.08em]
          inline-block
          h-[0.85em]
          w-[0.04em]
          animate-pulse
          bg-current
          align-[-0.05em]
          "
          />
          </Link>
      </span>
    </span>
  );
}