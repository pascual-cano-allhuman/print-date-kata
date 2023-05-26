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
    spyPrintLine = jest.spyOn(Utils, "printLine").mockImplementation(() => {})
  });

  it("the current date is created", () => {
    printDate();
    expect(spyCurrentDate).toHaveBeenCalledTimes(1);
  });

  it("the date is formatted", () => {
    printDate();
    expect(spyFormatDate).toHaveBeenCalledTimes(1);
    expect(spyFormatDate).toHaveBeenCalledWith(mockDate);
  })

  it("the date is printed", () => {
    printDate();
    expect(spyPrintLine).toHaveBeenCalledTimes(1);
    expect(spyPrintLine).toHaveBeenCalledWith("1978-12-18");
  })
});
