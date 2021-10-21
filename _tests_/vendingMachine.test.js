const VendingMachine = require("../index");

describe("Vending Machine Tests", () => {
  test("should return an object", () => {
    const vendingMachine = new VendingMachine();
    expect(vendingMachine.toString()).toBe("[object Object]");
  });
});
