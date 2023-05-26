import { printDate } from "../src/date.utils";

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
