// input and output example: "2024-05-01T15:00:00" => { "2024.05.29", "03:00 am" }
export const formatDateString = (dateString: string) => {
  if (!dateString) {
    return { dateInDotFormat: "", timeInFormat: "" };
  }
  let [date, time] = dateString.split("T");
  let dateInDotFormat = date.replaceAll(
    "-",
    "."
  ) as `${number}.${number}.${number}`;
  let timeIn24 = Number(time.slice(0, 2));
  let timeIn12: number, period: "am" | "pm";
  let minute = Number(time.slice(3, 5));
  if (timeIn24 === 0) {
    timeIn12 = timeIn24 + 12;
    period = "am";
  } else if (timeIn24 > 0 && timeIn24 < 12) {
    timeIn12 = timeIn24;
    period = "am";
  } else if (timeIn24 === 12) {
    timeIn12 = timeIn24;
    period = "pm";
  } else if (timeIn24 > 12) {
    timeIn12 = timeIn24 - 12;
    period = "pm";
  }

  const timeInFormat = `${String(timeIn12!).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")} ${period!}`;

  return { dateInDotFormat, timeInFormat };
};

// input and output example: "05:00:00" => 5
export const formatDuration = (durationString: string) => {
  return Number(durationString.slice(0, 2));
};

// input and output example: (Date, "14", "20") => "2024-05-01T14:20:00"
export const formatDateTime = (date: Date, hour: string, minute: string) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const dMinus = (scheduledDate: string) => {
  const dDay = +new Date(scheduledDate);
  const currentDate = +new Date();

  // Calculate the difference in time (in milliseconds)
  const timeDifference = dDay - currentDate;
  // Convert the difference in time to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};
