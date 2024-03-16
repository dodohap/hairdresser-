export const formatDateToReadableString = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString("pl-PL", options);
};

// Example usage:
const readableDate = formatDateToReadableString("2024-03-07T14:28:47.693Z");
console.log(readableDate); // Outputs: "March 7, 2024, 2:28 PM" (depending on your locale)
