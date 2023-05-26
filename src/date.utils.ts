export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-IE", { weekday: "long" });
};

export const printDate = (): void => {
  const date = getCurrentDate();
  const formattedDate = formatDate(date);
  printLine(formattedDate);
};

export const getCurrentDate = () => {
  return new Date();
};
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-IE");
};
export const printLine = (line: string) => {
  console.log(line);
};
