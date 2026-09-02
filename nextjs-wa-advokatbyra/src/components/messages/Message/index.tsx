"use client";

import { FormEvent, useState } from "react";

import Section from "@/components/Section";

const subjectOptions = [
  "Rådgivning",
  "Utbildning/kurs",
  "Entreprenadjuridik",
  "Offentlig upphandling",
  "Annat",
];

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
    <fieldset className="space-y-sm">
      <legend className="mb-md font-subheading font-semibold">
        {legend}
      </legend>

      <div className="flex flex-col gap-sm">
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
                  checked:bg-ink-1
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-ink-1
                "
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const inputClasses = `
  h-15 w-full rounded-full bg-white px-lg
  font-body text-ink-1 placeholder:text-ink-1/50
  outline-none transition-shadow
  focus-visible:ring-2 focus-visible:ring-ink-1
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
        eyebrow="Meddelande skickat"
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
              rounded-full bg-ink-1 px-lg py-md
              font-body text-white
              transition-opacity hover:opacity-80
            "
          >
            Skicka nytt meddelande →
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section
      heading="Skicka ett meddelande!"
      eyebrow="Kontakt"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2xl"
      >
        <p className="font-body">
          Fyll i formuläret så återkommer vi till dig så snart som möjligt.
        </p>

        <CheckboxGroup
          legend="Ärende ämne"
          name="subjects"
          options={subjectOptions}
        />

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

        <fieldset className="flex flex-col gap-sm">
          <legend className="mb-md font-subheading font-semibold">
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
            placeholder="För- och efternamn"
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
            placeholder="E-post"
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

        <fieldset className="flex flex-col gap-sm">
          <legend className="mb-md font-subheading font-semibold">
            Företagsuppgifter
          </legend>

          <input
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Företagsnamn"
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
            required
            rows={7}
            className="
              w-full resize-y rounded-md bg-white p-lg
              font-body text-ink-1 placeholder:text-ink-1/50
              outline-none
              focus-visible:ring-2 focus-visible:ring-ink-1
            "
          />
        </div>

        <label className="flex cursor-pointer items-start gap-sm font-body text-sm">
          <input
            type="checkbox"
            name="privacyAccepted"
            required
            className="
              mt-1 size-md shrink-0 cursor-pointer
              appearance-none rounded-sm border border-ink-1 bg-white
              checked:bg-ink-1
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-ink-1
            "
          />

          <span>
            Jag har tagit del av hur WA Advokatbyrå behandlar mina
            personuppgifter i enlighet med integritetspolicyn och accepterar
            de allmänna villkoren.
          </span>
        </label>

        <div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="
              rounded-full bg-ink-1 px-lg py-md
              font-body text-white
              transition-opacity
              hover:opacity-80
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {status === "submitting"
              ? "Skickar..."
              : "Skicka meddelande"}
          </button>

          {status === "error" && (
            <p role="alert" className="mt-sm font-body text-red-600">
              Misslyckades att skicka meddelandet. Kontrollera att du har fyllt
              i alla obligatoriska fält.
            </p>
          )}
        </div>
      </form>
    </Section>
  )
}