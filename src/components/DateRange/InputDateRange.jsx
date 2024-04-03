import { Label, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { FaCalendar } from "react-icons/fa";

function InputDateRange({
  setEndDate,
  setStartDate,
  startDate = null,
  endDate = null,
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate" && value !== "") {
      setIsDisabled(false);
    }

    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  return (
    <div className="col-span-2 md:col-span-1 flex flex-col md:flex-row gap-2">
      <div className="w-full flex flex-col gap-2">
        <Label
          className="font-semibold"
          htmlFor="startDate"
          value="Fechas de inicio"
        />
        <TextInput
          type="date"
          id="startDate"
          name="startDate"
          min={new Date().toISOString().split("T")[0]}
          icon={FaCalendar}
          value={startDate ?? ""}
          onChange={handleDateChange}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Label
          className="font-semibold"
          htmlFor="endDate"
          value="Fechas de finalización"
        />
        <TextInput
          type="date"
          id="endDate"
          name="endDate"
          min={startDate}
          disabled={isDisabled}
          icon={FaCalendar}
          value={endDate ?? ""}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export default InputDateRange;
