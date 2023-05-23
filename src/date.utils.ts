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

export class Calendar {
  getShortDate(): string {
    return new Date().toLocaleDateString("en-IE");
  }
}

export class Printer {
  printLine(line: string): void {
    console.log(line);
  }
}

export class DatePrinter {
  calendar: Calendar;
  printer: Printer;
  constructor(calendar: Calendar, printer: Printer) {
    this.calendar = calendar;
    this.printer = printer;
  }
  printDate(): void {
    const shortDate = this.calendar.getShortDate();
    this.printer.printLine(shortDate);
  }
}
