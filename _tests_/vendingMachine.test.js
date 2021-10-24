const VendingMachine = require("../index");

describe("Vending Machine Tests", () => {
  test("should return an object", () => {
    const vendingMachine = new VendingMachine();
    expect(vendingMachine.toString()).toBe("[object Object]");
  });
  describe("Properties", () => {
    describe("acceptedCash property", () => {
      test("should have acceptedCash property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("_acceptedCash");
      });
      test("acceptedCash property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine._acceptedCash).toEqual([1, 5, 10, 20, 50]);
      });
    });
    describe("inventory property", () => {
      test("should have inventory property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("_inventory");
      });
      test("inventory property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        const expectedInventory = {
          coke: { itemName: "coke", count: 10, itemPrice: 55 },
          tango: { itemName: "tango", count: 10, itemPrice: 35 },
          water: { itemName: "water", count: 10, itemPrice: 45 },
        };
        expect(vendingMachine._inventory).toEqual(expectedInventory);
      });
    });
    describe("storedBalance property", () => {
      test("should have storedBalance property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("_storedBalance");
      });
      test("storedBalance property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        const expectedStoredBalance = {
          _onePence: { count: 100, value: 1 },
          _fivePence: { count: 100, value: 5 },
          _tenPence: { count: 100, value: 10 },
          _twentyPence: { count: 100, value: 20 },
          _fiftyPence: { count: 100, value: 50 },
        };
        expect(vendingMachine._storedBalance).toEqual(expectedStoredBalance);
      });
    });
    describe("insertedBalance property", () => {
      test("should have insertedBalance property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("_insertedBalance");
      });
      test("insertedBalance property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        const expectedInsertedBalance = {
          _onePence: { count: 0, value: 1 },
          _fivePence: { count: 0, value: 5 },
          _tenPence: { count: 0, value: 10 },
          _twentyPence: { count: 0, value: 20 },
          _fiftyPence: { count: 0, value: 50 },
        };
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
      });
    });
    describe("selectedItems property", () => {
      test("should have selectedItems property", () => {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine).toHaveProperty("_selectedItems");
      });
      test("selectedItems property should have correct value", () => {
        const vendingMachine = new VendingMachine();
        const expectedSelectedItems = {};
        expect(vendingMachine._selectedItems).toEqual(expectedSelectedItems);
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
            const expectedInsertedBalance = {
              _onePence: { count: 0, value: 1 },
              _fivePence: { count: 0, value: 5 },
              _tenPence: { count: 0, value: 10 },
              _twentyPence: { count: 0, value: 20 },
              _fiftyPence: { count: 0, value: 50 },
            };
            expect(vendingMachine._insertedBalance).toEqual(
              expectedInsertedBalance
            );
          }
        }
      });
      test("should add valid cash values to insertedCash property", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCash(1);
        let expectedInsertedBalance = {
          _onePence: { count: 1, value: 1 },
          _fivePence: { count: 0, value: 5 },
          _tenPence: { count: 0, value: 10 },
          _twentyPence: { count: 0, value: 20 },
          _fiftyPence: { count: 0, value: 50 },
        };
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
        vendingMachine.insertCash(5);
        expectedInsertedBalance._fivePence.count = 1;
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
        vendingMachine.insertCash(10);
        expectedInsertedBalance._tenPence.count = 1;
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
        vendingMachine.insertCash(20);
        expectedInsertedBalance._twentyPence.count = 1;
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
        vendingMachine.insertCash(50);
        expectedInsertedBalance._fiftyPence.count = 1;
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
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
        let expectedSelectedItems = {
          coke: { count: 1, itemName: "coke", itemPrice: 55 },
        };
        expect(vendingMachine._selectedItems).toEqual(expectedSelectedItems);
        vendingMachine.selectItem("tango");
        expectedSelectedItems = {
          coke: { count: 1, itemName: "coke", itemPrice: 55 },
          tango: { count: 1, itemName: "tango", itemPrice: 35 },
        };
        expect(vendingMachine._selectedItems).toEqual(expectedSelectedItems);
        vendingMachine.selectItem("water");
        expectedSelectedItems = {
          coke: { count: 1, itemName: "coke", itemPrice: 55 },
          tango: { count: 1, itemName: "tango", itemPrice: 35 },
          water: { count: 1, itemName: "water", itemPrice: 45 },
        };
        expect(vendingMachine._selectedItems).toEqual(expectedSelectedItems);
        expect(vendingMachine._selectedItems.totalValue).toBe(135);
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
        let expectedPurchasedItems = {
          purchasedItems: {
            coke: { count: 1, itemName: "coke", itemPrice: 55 },
          },
          change: 0,
        };
        expect(vendingMachine1.purchaseItems()).toEqual(expectedPurchasedItems);
        const vendingMachine2 = new VendingMachine();
        vendingMachine2.selectItem("tango");
        vendingMachine2.selectItem("water");
        vendingMachine2.insertCash(50);
        vendingMachine2.insertCash(50);
        expectedPurchasedItems = {
          purchasedItems: {
            tango: { count: 1, itemName: "tango", itemPrice: 35 },
            water: { count: 1, itemName: "water", itemPrice: 45 },
          },
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
        const expectedInsertedBalance = {
          _onePence: { count: 0, value: 1 },
          _fivePence: { count: 0, value: 5 },
          _tenPence: { count: 0, value: 10 },
          _twentyPence: { count: 0, value: 20 },
          _fiftyPence: { count: 0, value: 50 },
        };
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
      });
      test("should reset selectedItems after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        const expectedSelectedItems = {};
        expect(vendingMachine._selectedItems).toEqual(expectedSelectedItems);
      });

      test("should update inventory property after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.selectItem("tango");
        vendingMachine.selectItem("water");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        const expectedInventory = {
          coke: { itemName: "coke", count: 9, itemPrice: 55 },
          tango: { itemName: "tango", count: 9, itemPrice: 35 },
          water: { itemName: "water", count: 9, itemPrice: 45 },
        };
        expect(vendingMachine._inventory).toEqual(expectedInventory);
      });
      test("should update stored cash after purchase", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("water");
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        const expectedStoredBalance = {
          _onePence: { count: 100, value: 1 },
          _fivePence: { count: 100, value: 5 },
          _tenPence: { count: 100, value: 10 },
          _twentyPence: { count: 100, value: 20 },
          _fiftyPence: { count: 101, value: 50 },
        };
        expect(vendingMachine._storedBalance).toEqual(expectedStoredBalance);
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
        const expectedReturnedBalance = {
          onePence: { count: 0, value: 1 },
          fivePence: { count: 0, value: 5 },
          tenPence: { count: 0, value: 10 },
          twentyPence: { count: 1, value: 20 },
          fiftyPence: { count: 1, value: 50 },
        };
        expect(vendingMachine.cancelTransaction()).toEqual(
          expectedReturnedBalance
        );
      });
      test("should reset insertedCash property to 0 after cancellation", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(20);
        vendingMachine.cancelTransaction();
        const expectedInsertedBalance = {
          _onePence: { count: 0, value: 1 },
          _fivePence: { count: 0, value: 5 },
          _tenPence: { count: 0, value: 10 },
          _twentyPence: { count: 0, value: 20 },
          _fiftyPence: { count: 0, value: 50 },
        };
        expect(vendingMachine._insertedBalance).toEqual(
          expectedInsertedBalance
        );
      });
      test("should reset selectedItems after cancellation", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.cancelTransaction();
        const expectedSelectedItems = {};
        expect(vendingMachine._selectedItems).toEqual(expectedSelectedItems);
      });
    });
    describe("resetMachine method", () => {
      test("should have resetMachine method", () => {
        const vendingMachine = new VendingMachine();
        expect(typeof vendingMachine.resetMachine).toBe("function");
      });
      test("should reset inventory and storedCash properties to original values", () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.selectItem("coke");
        vendingMachine.insertCash(50);
        vendingMachine.insertCash(50);
        vendingMachine.purchaseItems();
        vendingMachine.resetMachine();
        const expectedInventory = {};
        expect(vendingMachine._inventory).toEqual(expectedInventory);
        const expectedStoredBalance = {
          _onePence: { count: 0, value: 1 },
          _fivePence: { count: 0, value: 5 },
          _tenPence: { count: 0, value: 10 },
          _twentyPence: { count: 0, value: 20 },
          _fiftyPence: { count: 0, value: 50 },
        };
        expect(vendingMachine._storedBalance).toEqual(expectedStoredBalance);
      });
    });
  });
});
