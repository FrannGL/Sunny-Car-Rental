"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MyDatePickerProps {
  form?: boolean;
  value: Date | null;
  onChange: (date: Date) => void;
  disablePastDays?: boolean;
}

export default function MyDatePicker({
  onChange,
  value,
  form,
  disablePastDays = false,
}: MyDatePickerProps) {
  return (
    <DatePicker
      selected={value}
      dateFormat="dd/MM/yyyy"
      onChange={(date: Date | null) => {
        if (date) {
          onChange(date);
        }
      }}
      className={
        !form ? "search-input datepicker" : "form-control calendar-date"
      }
      minDate={disablePastDays ? new Date() : undefined}
    />
  );
}
