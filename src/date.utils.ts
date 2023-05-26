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

export interface IDateManager {
  getCurrentDate(): Date;
  formatDate(date: Date): string;
}

export interface IPrintManager {
  printLine(line: string): void;
}

export class PrintDate {
  dateManager: IDateManager;
  printManager: IPrintManager;

  constructor(dateManager: IDateManager, printManager: IPrintManager) {
    this.dateManager = dateManager;
    this.printManager = printManager;
  }

  printDate(): void {
    const date = this.dateManager.getCurrentDate();
    const formattedDate = this.dateManager.formatDate(date);
    this.printManager.printLine(formattedDate);
  }
}

export class DateManager implements IDateManager {
  getCurrentDate = () => {
    return new Date();
  };
  formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IE");
  };
}

export class PrintManager implements IPrintManager {
  printLine = (line: string) => {
    console.log(line);
  };
}
