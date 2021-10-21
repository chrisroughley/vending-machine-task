class VendingMachine {
  constructor() {
    this.acceptedCash = [1, 5, 10, 20, 50];
    this.stock = {
      coke: { quantity: 10, price: 55 },
      tango: { quantity: 10, price: 35 },
      water: { quantity: 10, price: 45 },
    };
    this.storedCash = 1000;
    this.insertedCash = 0;
    this.selectedItems = { items: [], totalCost: 0 };
  }
}

module.exports = VendingMachine;
