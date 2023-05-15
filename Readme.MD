# Print Date Kata

## Goal

Be able to test printDate function.

```
export const printDate = (): void => {
  console.log(new Date().toLocaleDateString("en-IE"));
};
```

# Test doubles

According to https://martinfowler.com/bliki/TestDouble.html

## Mocks

A _mock_ changes production code with a pre-programmed replacement that is able to receive the same calls than the original
In Jest we mock _entire_ modules.

```
jest.mock("../src/date.utils");
import { getDayName } from "../src/date.utils";
```

## Stubs

A _stub_ provides canned answers to calls during the test, usually not responding at all to the inputs provided.
In Jest we can provide the implentation at the same time that we declare the mock.

```
jest.mock("../src/date.utils.ts", () => ({
  getDayName: () => "Friday",
}));
import { getDayName } from "../src/date.utils";
```

## Spies

_Spies_ are stubs that also record some information based on how they were called.
In Jest we can use `jest.fn` to provide the implemenation and spy the function calls.

```
jest.mock("../src/date.utils.ts", () => ({
  getDayName: jest.fn(() => "Friday"),
}));
import { getDayName } from "../src/date.utils";

it("some test", ()=>{
  getDayName(new Date());
  expect(getDayName).toHaveBeenCalled();
});
```

On the other hand `jest.spyOn` can provide extra flexibility. `spyOn` can be used to mock a single method from a module.

```
import * as utils from "../src/date.utils";
const spy = jest.spyOn(utils, "getDayName").mockImplementation(() => "Friday");
const { getDayName } = utils;

it("some test", () => {
  getDayName(new Date());
  expect(spy).toHaveBeenCalled();
});
```

> Exercise: Create tests for the _printDate_ function using spies.

## Collaborators

Let's call _Collaborator_ to any secondary function or class that we extract from the main code under test in order to separate concerns and keep single responsabilities.
One of the advantages of extracting collaborators is that allows to test responsibilities in isolation, simplifying the individual tests.

> Exercise: Modify the test for _printDate_ using collaborators.

### Extra ball. Dependency injection.

Using classes, there is a different strategy for replacing collaborators with test doubles called _dependency injection_.
The idea of is to pass the fake collaborators to the main class constructor during its initialisation.

```
class PrintDate {
  calendar: Calendar; // an object with the responsibility of managing dates and formatting them. Calendar is an interface.
  printer: Printer; // an object with the responsibility of printing text into an output. Printer is an interface.

  constructor(calendar: Calendar, printer: Printer) {
    this.calendar = calendar;
    this.printer = printer;
  }

// implement printDate method

}
```

> Advanced Exercise: Create from scratch spies to test `printDate` without using neither `jest.spyOn` nor `jest.mock`

# Credit

This kata was originally developed by [Codium](https://github.com/CodiumTeam/print-date).
