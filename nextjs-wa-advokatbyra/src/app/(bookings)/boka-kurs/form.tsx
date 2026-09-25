"use client";

import Icon from "@/components/Icon";
import Section from "@/components/sections/Section";
import Link from "next/link";
import { FormEvent, useState } from "react";


// const subjectOptions = [
//   "Utbildning/kurs",
//   "Entreprenadjuridik",
//   "Offentlig upphandling",
//   "Annat",
// ];

const constructionCourses = [
  "Grundkurs i entreprenadjuridik",
  "Fortsättningskurs i entreprenadjuridik",
  "Konsulträtt (ABK09)",
  "Avtalsskrivning och avtalsgranskning",
  "Företagsanpassad kurs",
];

const procurementCourses = [
  "Offentlig upphandling för leverantörer",
  "Offentlig upphandling för beställare",
  "Fördjupningskurs i offentlig upphandling",
  "Företagsanpassad kurs",
];

type CheckboxGroupProps = {
  legend: string;
  name: string;
  options: string[];
};

function CheckboxGroup({
  legend,
  name,
  options,
}: CheckboxGroupProps) {
  return (
    <fieldset>
      <div className="flex flex-col gap-md">

      <legend className="mb-lg font-subheading text-ink">
        {legend}
      </legend>

      <div className="flex flex-col gap-xs">
        {options.map((option) => {
          const id = `${name}-${option}`
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("/", "-");

          return (
            <label
              key={option}
              htmlFor={id}
              className="flex w-fit cursor-pointer items-center gap-sm font-body"
            >
              <span>{option}</span>

              <input
                id={id}
                type="checkbox"
                name={name}
                value={option}
                className="
                  size-md shrink-0 cursor-pointer
                  appearance-none rounded-sm border border-ink-1 bg-white
                  checked:bg-ink
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-ink-1
                "
              />
            </label>
          );
        })}
      </div>
      </div>
    </fieldset>
  );
}

const inputClasses = `
  w-full rounded-full bg-white px-md py-sm
  font-body text-ink
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-footer
`;

export default function Message() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      console.log(Object.fromEntries(formData.entries()));

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Section
        heading="Tack för ditt meddelande!"
        eyebrow="Formulär skickat"
      >
        <div className="flex flex-col items-start gap-lg font-body">
          <p>
            Vi har tagit emot dina uppgifter och återkommer till dig så snart
            som möjligt, vanligtvis inom 24 timmar.
          </p>

          <p>Klicka på knappen nedan om du vill skicka ett till meddelande.</p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="
              group inline-flex w-fit items-center justify-center gap-sm
              rounded-full bg-ink px-md py-sm
              font-subheading text-white
              transition-all duration-300
              hover:gap-md hover:bg-accent
              active:gap-md active:bg-accent
              disabled:cursor-wait disabled:opacity-60
            "
          >
            Skicka nytt meddelande <Icon name="arrow" className="text-white" size="" />
          </button>
        </div>
      </Section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative grid w-full grid-cols-1 lg:grid-cols-2 gap-x-xl gap-y-md"
    >
      <p className="col-span-1 lg:col-span-2 font-eyebrow text-muted">kursbokning</p>
      <section className="col-span-1 md:col-span-2 lg:col-span-1">
        <h1 className="font-heading mb-md text-ink">Boka en kurs med WA Advokatbyrå</h1>
        <p className="font-body">
          Fyll i formuläret så återkommer vi till dig så snart som möjligt.
        </p>
        <div className="grid mt-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-md">

          <CheckboxGroup
            legend="Välj kurser inom entreprenadjuridik"
            name="constructionCourses"
            options={constructionCourses}
            />

          <CheckboxGroup
            legend="Välj kurser inom offentlig upphandling"
            name="procurementCourses"
            options={procurementCourses}
          />
        </div>
      </section>
      <section className="col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="font-heading-sm my-md lg:sr-only">Formulär</h2>
        <fieldset className="flex flex-col gap-sm">
          <legend className="mb-md font-eyebrow text-muted">
            Kontaktuppgifter
          </legend>

          <label className="sr-only" htmlFor="fullName">
            För- och efternamn
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="För- och efternamn *"
            required
            className={inputClasses}
          />

          <label className="sr-only" htmlFor="email">
            E-post
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="E-post *"
            required
            className={inputClasses}
          />

          <label className="sr-only" htmlFor="phone">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Telefon"
            className={inputClasses}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-sm mt-md">
          <legend className="mb-md font-eyebrow text-muted">
            Företagsuppgifter
          </legend>

          <input
            name="companyName"
            type="text"
            required
            autoComplete="organization"
            placeholder="Företagsnamn *"
            aria-label="Företagsnamn"
            className={inputClasses}
          />

          <input
            name="streetAddress"
            type="text"
            autoComplete="street-address"
            placeholder="Postadress"
            aria-label="Postadress"
            className={inputClasses}
          />

          <input
            name="postalAddress"
            type="text"
            placeholder="Postnr och ort"
            aria-label="Postnummer och ort"
            className={inputClasses}
          />

          <input
            name="organisationNumber"
            type="text"
            placeholder="Organisationsnummer"
            aria-label="Organisationsnummer"
            className={inputClasses}
          />
        </fieldset>

        <div>
          <label className="sr-only" htmlFor="message">
            Meddelande
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Skriv ditt meddelande"
            rows={3}
            className="
              w-full rounded-md bg-white px-md py-sm
              font-body text-ink
              focus-visible:outline-2
              focus-visible:outline-offset-2
            focus-visible:outline-footer"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-sm font-caption my-sm">
          <input
            type="checkbox"
            name="privacyAccepted"
            required
            className="
              mt-1 size-md shrink-0 cursor-pointer
              appearance-none rounded-sm border border-ink bg-white
              checked:bg-ink
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-ink
            "
          />

          <span>
            Jag har tagit del av hur WA Advokatbyrå behandlar mina
            personuppgifter i enlighet med <Link href="/integritetspolicy" className="underline hover:cursor-pointer hover:text-accent">integritetspolicyn</Link> och accepterar
            de allmänna villkoren.
          </span>
        </label>

        <div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="
              group inline-flex w-fit items-center justify-center gap-sm
              rounded-full bg-ink px-md py-sm
              font-subheading text-white
              transition-all duration-300
              hover:gap-md hover:bg-accent
              active:gap-md active:bg-accent
              disabled:cursor-wait disabled:opacity-60
            "
          >
            {status === "submitting"
              ? "Skickar..."
              : "Skicka meddelande"}
          </button>

          {status === "error" && (
            <p role="alert" className="mt-sm font-body text-red">
              Misslyckades att skicka meddelandet. Kontrollera att du har fyllt
              i alla obligatoriska fält.
            </p>
          )}
        </div>

        </section>
      </form>
  )
}