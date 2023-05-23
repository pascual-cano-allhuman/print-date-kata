export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-IE", { weekday: "long" });
};

export const getShortDate = (): string => {
  return new Date().toLocaleDateString("en-IE");
};

export const printLine = (line: string): void => {
  console.log(line);
};

export const printDate = (): void => {
  const shortDate = getShortDate();
  printLine(shortDate);
};
