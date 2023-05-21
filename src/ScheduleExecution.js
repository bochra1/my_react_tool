import React, { useState } from "react";

const ScheduleExecution = () => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleScheduleClick = () => {
    const scheduledTime = new Date(selectedDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = scheduledTime - currentTime;

    if (timeDifference < 0) {
      alert("Please select a future date and time.");
      return;
    }

    setTimeout(() => {
      alert("Function executed at " + new Date(scheduledTime).toLocaleString());
      setIsScheduled(false);
    }, timeDifference);

    setIsScheduled(true);
  };

  return (
    <div>
      <label>
        Select a date and time:
        <input type="datetime-local" value={selectedDateTime} onChange={handleDateTimeChange} />
      </label>
      <br />
      <button disabled={isScheduled} onClick={handleScheduleClick}>
        {isScheduled ? "Scheduled" : "Schedule Execution"}
      </button>
    </div>
  );
};

export default ScheduleExecution;
