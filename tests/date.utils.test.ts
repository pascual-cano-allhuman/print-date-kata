import * as utils from "../src/date.utils";
const { printDate, getShortDate, printLine, DatePrinter } = utils;
import { Calendar, Printer, ICalendar, IPrinter } from "../src/date.utils";

describe("printDate spies tests", () => {
  let dateSpy: jest.SpyInstance, consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    const fixedDate = new Date("2021-01-01");
    dateSpy = jest.spyOn(global, "Date").mockImplementation(() => fixedDate);
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("creates a new date", () => {
    printDate();
    expect(dateSpy).toHaveBeenCalled();
  });
  it("console logs the mocked date", () => {
    printDate();
    expect(consoleSpy).toBeCalledWith("1/1/2021");
  });
});

describe("printDate spies  collaborators tests", () => {
  let shortDateSpy: jest.SpyInstance, printLineSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    shortDateSpy = jest.spyOn(utils, "getShortDate").mockImplementation(() => "1/1/2021");
    printLineSpy = jest.spyOn(utils, "printLine").mockImplementation(() => {});
  });

  it("creates a new date", () => {
    printDate();
    expect(shortDateSpy).toHaveBeenCalled();
  });
  it("console logs the mocked date", () => {
    printDate();
    expect(printLineSpy).toBeCalledWith("1/1/2021");
  });
});

describe("testing collaborators", () => {
  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    const fixedDate = new Date("2021-01-01");
    jest.spyOn(global, "Date").mockImplementation(() => fixedDate);
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });
  it("getShortDate formats correctly current date", () => {
    const shortDate = getShortDate();
    expect(shortDate).toBe("1/1/2021");
  });

  it("printLine console logs the input", () => {
    printLine("hello");
    expect(consoleSpy).toBeCalledWith("hello");
  });
});

describe("DatePrinter", () => {
  let datePrinter: utils.DatePrinter;
  let shortDateSpy: jest.SpyInstance, printLineSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    shortDateSpy = jest.spyOn(Calendar.prototype, "getShortDate").mockImplementation(() => "1/1/2021");
    printLineSpy = jest.spyOn(Printer.prototype, "printLine").mockImplementation(() => {});
    const calendar = new utils.Calendar();
    const printer = new utils.Printer();
    datePrinter = new DatePrinter(calendar, printer);
  });
  it("creates a new date", () => {
    datePrinter.printDate();
    expect(shortDateSpy).toHaveBeenCalled();
  });
  it("console logs the mocked date", () => {
    datePrinter.printDate();
    expect(printLineSpy).toBeCalledWith("1/1/2021");
  });
});

class CalendarFake implements ICalendar {
  hasBeenCalled = false;
  getShortDate(): string {
    this.hasBeenCalled = true;
    return "1/1/2021";
  }
}

class PrinterFake implements IPrinter {
  linesPrinted: string[] = [];
  printLine(line: string): void {
    this.linesPrinted.push(line);
  }
}

describe("DatePrinter with custom spies", () => {
  const calendar = new CalendarFake();
  const printer = new PrinterFake();
  const datePrinter = new DatePrinter(calendar, printer);

  it("creates a new date", () => {
    datePrinter.printDate();
    expect(calendar.hasBeenCalled).toBe(true);
  });
  it("console logs the mocked date", () => {
    datePrinter.printDate();
    expect(printer.linesPrinted[0]).toBe("1/1/2021");
  });
});
