export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-IE", { weekday: "long" });
};

export const printDate = (): void => {
  console.log(new Date().toLocaleDateString("en-IE"));
};
