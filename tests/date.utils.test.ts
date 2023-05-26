import { printDate } from "../src/date.utils";
import * as Utils from "../src/date.utils";

describe("printDate", () => {
  let spyDate: jest.SpyInstance;
  let spyLog: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    const mockDate = new Date("1978-12-18");
    spyDate = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    spyLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("the current date is created", () => {
    printDate();
    expect(spyDate).toHaveBeenCalledTimes(1);
  });

  it("the current date is printed", () => {
    printDate();
    expect(spyLog).toHaveBeenCalledTimes(1);
    expect(spyLog).toHaveBeenCalledWith("18/12/1978");
  });
});

describe("printDate_2", () => {
  let spyCurrentDate: jest.SpyInstance;
  let spyFormatDate: jest.SpyInstance;
  let spyPrintLine: jest.SpyInstance;
  const mockDate = new Date("1978-12-18");

  beforeEach(() => {
    jest.clearAllMocks();

    spyCurrentDate = jest.spyOn(Utils, "getCurrentDate").mockImplementation(() => mockDate);
    spyFormatDate = jest.spyOn(Utils, "formatDate").mockImplementation(() => "1978-12-18");
    spyPrintLine = jest.spyOn(Utils, "printLine").mockImplementation(() => {});
  });

  it("the current date is created", () => {
    printDate();
    expect(spyCurrentDate).toHaveBeenCalledTimes(1);
  });

  it("the date is formatted", () => {
    printDate();
    expect(spyFormatDate).toHaveBeenCalledTimes(1);
    expect(spyFormatDate).toHaveBeenCalledWith(mockDate);
  });

  it("the date is printed", () => {
    printDate();
    expect(spyPrintLine).toHaveBeenCalledTimes(1);
    expect(spyPrintLine).toHaveBeenCalledWith("1978-12-18");
  });
});

class PrintManagerSpy implements Utils.IPrintManager {
  linesPassed: string[] = [];
  printLine = (line: string) => {
    this.linesPassed.push(line);
  };
}

class DateManagerSpy implements Utils.IDateManager {
  currentDateHasBeenCalled = false;
  datesPassed: Date[] = [];

  getCurrentDate = () => {
    this.currentDateHasBeenCalled = true;
    return new Date("1978-12-18");
  };
  formatDate = (date: Date) => {
    this.datesPassed.push(date);
    return "18-12-1978";
  };
}

describe("PrintDate class", () => {
  let printManager: PrintManagerSpy;
  let dateManager: DateManagerSpy;
  let printDate: Utils.PrintDate;

  beforeEach(() => {
    printManager = new PrintManagerSpy();
    dateManager = new DateManagerSpy();
    printDate = new Utils.PrintDate(dateManager, printManager);
  });

  it("should create a date", () => {
    printDate.printDate();
    expect(dateManager.currentDateHasBeenCalled).toBe(true);
  });

  it("should format a date", () => {
    printDate.printDate();
    expect(dateManager.datesPassed[0]).toEqual(new Date("1978-12-18"));
  });

  it("a line should be printed", () => {
    printDate.printDate();
    expect(printManager.linesPassed.length).toBe(1);
    expect(printManager.linesPassed[0]).toBe("18-12-1978");
  });
});
