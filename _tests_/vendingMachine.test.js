const VendingMachine = require("../index");

describe("Vending Machine Tests", () => {
  test("should return an object", () => {
    const vendingMachine = new VendingMachine();
    expect(vendingMachine.toString()).toBe("[object Object]");
  });
  describe("Properties", () => {
    describe("Accepted cash property", () => {
      test("should have acceptedCash property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("acceptedCash");
      });
      test("acceptedCash property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine.acceptedCash).toEqual([1, 5, 10, 20, 50]);
      });
    });
    describe("Stock property", () => {
      test("should have stock property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("stock");
      });
      test("stock property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        const expectStock = {
          coke: { quantity: 10, price: 55 },
          tango: { quantity: 10, price: 35 },
          water: { quantity: 10, price: 45 },
        };
        expect(vendingMachine.stock).toEqual(expectStock);
      });
    });
    describe("storedCash property", () => {
      test("should have storedCash property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("storedCash");
      });
      test("storedCash property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine.storedCash).toBe(1000);
      });
    });
    describe("insertedCash property", () => {
      test("should have insertedCash property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("insertedCash");
      });
      test("insertedCash property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine.insertedCash).toBe(0);
      });
    });
    describe("selectedItems property", () => {
      test("should have selectedItems property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("selectedItems");
      });
      test("selectedItems property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        const expectedSelectedItems = { items: [], totalCost: 0 };
        expect(vendingMachine.selectedItems).toEqual(expectedSelectedItems);
      });
    });
  });
});
