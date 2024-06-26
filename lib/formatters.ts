// input and output example: "2024-05-01T15:00:00" => { "2024.05.29", "03:00 am" }
export const formatDateString = (dateString: string) => {
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

  const timeInFormat = `${timeIn12! && timeIn12 < 10 && "0"}${timeIn12!}:${
    minute && minute < 10 && "0"
  }${minute} ${period!}`;

  return { dateInDotFormat, timeInFormat };
};

// input and output example: "05:00:00" => 5
export const formatDuration = (durationString: string) => {
  return Number(durationString.slice(0, 2));
};
