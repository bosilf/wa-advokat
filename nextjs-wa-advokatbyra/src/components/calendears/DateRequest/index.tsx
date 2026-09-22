"use client";

import { useState } from "react";

export default function DateRequest({
  formId,
  inputClasses,
}: {
  formId: string;
  inputClasses: string;
}) {
  const [dates, setDates] = useState([""]);

  const addDate = () => {
    setDates((current) => [...current, ""]);
  };

  const updateDate = (index: number, value: string) => {
    setDates((current) =>
      current.map((date, i) =>
        i === index ? value : date
      )
    );
  };

  const removeDate = (index: number) => {
    setDates((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      {dates.map((date, index) => (
  <div
    className="flex flex-col gap-0 mb-md last-of-type:mb-0"
    key={index}
  >
    <label
      htmlFor={`${formId}-date-request-${index}`}
      className="sr-only"
    >
      Önskat datum {index + 1}
    </label>

    <input
      id={`${formId}-date-request-${index}`}
      type="date"
      name="date-request"
      value={date}
      onChange={(e) =>
        updateDate(index, e.target.value)
      }
      className={inputClasses}
    />

    {dates.length > 1 && (
      <button
        className="font-caption z-200 hover:cursor-pointer hover:text-red mr-auto"
        type="button"
        onClick={() => removeDate(index)}
      >
        - Ta bort
      </button>
    )}
  </div>
))}

      <button
        className="font-caption hover:text-accent hover:cursor-pointer mb-md"
        type="button"
        onClick={addDate}
      >
        + Lägg till ett datum
      </button>
    </div>
  );
}