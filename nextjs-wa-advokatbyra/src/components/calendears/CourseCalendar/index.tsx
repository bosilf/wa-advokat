"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { sv } from "react-day-picker/locale";

type Props = {
  numberOfDays: number;
};

export default function CourseDatePicker({
  numberOfDays,
}: Props) {
  const [selected, setSelected] = useState<Date[]>([]);

  function handleSelect(date: Date) {
    setSelected((current) => {
      const exists = current.some(
        (item) =>
          item.toDateString() === date.toDateString()
      );

      if (exists) {
        return current.filter(
          (item) =>
            item.toDateString() !== date.toDateString()
        );
      }

      if (current.length >= numberOfDays) {
        return current;
      }

      return [...current, date];
    });
  }

  return (
    <div>
      <p>
        Välj {numberOfDays}{" "}
        {numberOfDays === 1 ? "datum" : "datum"}
      </p>

      <DayPicker
        
        mode="multiple"
        locale={sv}
        selected={selected}
        onDayClick={handleSelect}
      />

      <p>
        {selected.length} av {numberOfDays} valda
      </p>
    </div>
  );
}