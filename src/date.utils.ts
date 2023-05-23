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

export interface ICalendar {
  getShortDate(): string;
}

export interface IPrinter {
  printLine(line: string): void;
}

export class Calendar implements ICalendar {
  getShortDate(): string {
    return new Date().toLocaleDateString("en-IE");
  }
}

export class Printer implements IPrinter {
  printLine(line: string): void {
    console.log(line);
  }
}

export class DatePrinter {
  calendar: ICalendar;
  printer: IPrinter;
  constructor(calendar: Calendar, printer: Printer) {
    this.calendar = calendar;
    this.printer = printer;
  }
  printDate(): void {
    const shortDate = this.calendar.getShortDate();
    this.printer.printLine(shortDate);
  }
}
