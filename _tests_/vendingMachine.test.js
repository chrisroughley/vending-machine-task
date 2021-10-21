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

  describe("Methods", () => {
    describe("insertCash method", () => {
      test("should have insertCash method", () => {
        const vendingMachine = new VendingMachine();
        expect(typeof vendingMachine.insertCash).toBe("function");
      });
      test("should return non-accepted values of 1, 5, 10, 20, 50", () => {
        const vendingMachine = new VendingMachine();
        const acceptedValues = [1, 5, 10, 20, 50];
        for (let i = 0; i <= 100; i++) {
          if (!acceptedValues.includes(i)) {
            expect(vendingMachine.insertCash(i)).toBe(i);
            expect(vendingMachine.insertedCash).toBe(0);
          }
        }
      });
      test("should add valid cash values to insertedCash property", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCash(1);
        expect(vendingMachine.insertedCash).toBe(1);
        vendingMachine.insertCash(5);
        expect(vendingMachine.insertedCash).toBe(6);
        vendingMachine.insertCash(10);
        expect(vendingMachine.insertedCash).toBe(16);
        vendingMachine.insertCash(20);
        expect(vendingMachine.insertedCash).toBe(36);
        vendingMachine.insertCash(50);
        expect(vendingMachine.insertedCash).toBe(86);
      });
    });
    describe("selectItem method", () => {
      test("should have selectItem method", () => {
        const vendingMachine = new VendingMachine();
        expect(typeof vendingMachine.selectItem).toBe("function");
      });
      test("should only accept valid items", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine.selectItem("pepsi")).toBe("invalid item");
      });
      test("should add selected item to selectedItems", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        let expectedSelectedItems = { items: ["coke"], totalCost: 55 };
        expect(vendingMachine.selectedItems).toEqual(expectedSelectedItems);
        vendingMachine.selectItem("tango");
        expectedSelectedItems = {
          items: ["coke", "tango"],
          totalCost: 90,
        };
        expect(vendingMachine.selectedItems).toEqual(expectedSelectedItems);
        vendingMachine.selectItem("water");
        expectedSelectedItems = {
          items: ["coke", "tango", "water"],
          totalCost: 135,
        };
        expect(vendingMachine.selectedItems).toEqual(expectedSelectedItems);
      });
    });
    describe("purchaseItems method", () => {
      test("should have purchaseItems method", () => {
        const vendingMachine = new VendingMachine();
        expect(typeof vendingMachine.purchaseItems).toBe("function");
      });
      test("should return insufficient funds string if not enough cash has been inserted", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        expect(vendingMachine.purchaseItems()).toBe("insufficient funds");
      });

      test("should return an object with correct purchased items and change values", () => {
        const vendingMachine1 = new VendingMachine();
        vendingMachine1.selectItem("coke");
        vendingMachine1.insertCash(50);
        vendingMachine1.insertCash(5);
        let expectedPurchasedItems = { purchasedItems: ["coke"], change: 0 };
        expect(vendingMachine1.purchaseItems()).toEqual(expectedPurchasedItems);
        const vendingMachine2 = new VendingMachine();
        vendingMachine2.selectItem("tango");
        vendingMachine2.selectItem("water");
        vendingMachine2.insertCash(50);
        vendingMachine2.insertCash(50);
        expectedPurchasedItems = {
          purchasedItems: ["tango", "water"],
          change: 20,
        };
        expect(vendingMachine2.purchaseItems()).toEqual(expectedPurchasedItems);
      });
      test("should reset insertedCash property to 0 after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(20);
        vendingMachine.purchaseItems();
        expect(vendingMachine.insertedCash).toBe(0);
      });
      test("should reset selectedItems after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        const expectedSelectedItems = { items: [], totalCost: 0 };
        expect(vendingMachine.selectedItems).toEqual(expectedSelectedItems);
      });

      test("should update stock property after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.selectItem("tango");
        vendingMachine.selectItem("water");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        const expectedStock = {
          coke: { quantity: 9, price: 55 },
          tango: { quantity: 9, price: 35 },
          water: { quantity: 9, price: 45 },
        };
        expect(vendingMachine.stock).toEqual(expectedStock);
      });
      test("should update stored cash after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("water");
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        expect(vendingMachine.storedCash).toBe(1045);
      });
    });
    describe("cancelTransaction method", () => {
      test("should have cancelTransaction method", () => {
        const vendingMachine = new VendingMachine();
        expect(typeof vendingMachine.cancelTransaction).toBe("function");
      });
      test("should return inserted cash to user", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(20);
        expect(vendingMachine.cancelTransaction()).toBe(70);
      });
      test("should reset insertedCash property to 0 after cancellation", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(20);
        vendingMachine.cancelTransaction();
        expect(vendingMachine.insertedCash).toBe(0);
      });
      test("should reset selectedItems after cancellation", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.cancelTransaction();
        const expectedSelectedItems = { items: [], totalCost: 0 };
        expect(vendingMachine.selectedItems).toEqual(expectedSelectedItems);
      });
    });
    describe("resetMachine method", () => {
      test("should have resetMachine method", () => {
        const vendingMachine = new VendingMachine();
        expect(typeof vendingMachine.resetMachine).toBe("function");
      });
      test("should reset stock and storedCash properties to original values", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        vendingMachine.resetMachine();
        const expectedStock = {
          coke: { quantity: 10, price: 55 },
          tango: { quantity: 10, price: 35 },
          water: { quantity: 10, price: 45 },
        };
        expect(vendingMachine.stock).toEqual(expectedStock);
        expect(vendingMachine.storedCash).toEqual(1000);
      });
    });
  });
});
