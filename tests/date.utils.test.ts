import { printDate } from "../src/date.utils";

describe("printDate", () => {
  const fixedDate = new Date("2021-01-01");
  const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => fixedDate);
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => ({ log: jest.fn() }));
  it("creates a new date", () => {
    printDate();
    expect(dateSpy).toHaveBeenCalled();
  });
  it("console logs the mocked date", () => {
    printDate();
    expect(consoleSpy).toBeCalledWith("1/1/2021");
  });
});
