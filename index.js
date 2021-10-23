class Item {
  constructor() {}
}

class Inventory {
  constructor(coke, tango, water) {}
}

class Balance {
  constructor(
    onePence = 0,
    fivePence = 0,
    tenPence = 0,
    twentyPence = 0,
    fiftyPence = 0
  ) {
    this.onePence = { count: onePence, value: 1 };
    this.fivePence = { count: fivePence, value: 5 };
    this.tenPence = { count: tenPence, value: 10 };
    this.twentyPence = { count: twentyPence, value: 20 };
    this.fiftyPence = { count: fiftyPence, value: 50 };
  }

  get totalValue() {
    let totalValue = 0;
    Object.values(this).forEach((value) => {
      totalValue += value.count * value.value;
    });
    return totalValue;
  }

  addToBalance(cash) {
    switch (cash) {
      case 1:
        this.onePence.count++;
        break;
      case 5:
        this.fivePence.count++;
        break;
      case 10:
        this.tenPence.count++;
        break;
      case 20:
        this.twentyPence.count++;
        break;
      case 50:
        this.fiftyPence.count++;
        break;
    }
  }

  addTransferredBalance(transferredBalance) {
    this.onePence.count += transferredBalance.onePence.count;
    this.fivePence.count += transferredBalance.fivePence.count;
    this.tenPence.count += transferredBalance.tenPence.count;
    this.twentyPence.count += transferredBalance.twentyPence.count;
    this.fiftyPence.count += transferredBalance.fiftyPence.count;
  }

  clearBalance() {
    this.onePence.count = 0;
    this.fivePence.count = 0;
    this.tenPence.count = 0;
    this.twentyPence.count = 0;
    this.fiftyPence.count = 0;
  }
}

class VendingMachine {
  constructor() {
    this.acceptedCash = [1, 5, 10, 20, 50];
    this.inventory = {
      coke: { quantity: 10, price: 55 },
      tango: { quantity: 10, price: 35 },
      water: { quantity: 10, price: 45 },
    };
    this.storedBalance = new Balance(100, 100, 100, 100, 100);
    this.insertedBalance = new Balance();
    this.selectedItems = { items: [], totalCost: 0 };
  }

  insertCash(cash) {
    if (!this.acceptedCash.includes(cash)) return cash;
    this.insertedBalance.addToBalance(cash);
  }

  selectItem(selectedItem) {
    if (!this.inventory.hasOwnProperty(selectedItem)) return "invalid item";
    this.selectedItems.items.push(selectedItem);
    this.selectedItems.totalCost += this.inventory[selectedItem].price;
  }

  purchaseItems() {
    if (this.insertedBalance.totalValue < this.selectedItems.totalCost)
      return "insufficient funds";
    const purchasedItems = {
      purchasedItems: [...this.selectedItems.items],
      change: this.insertedBalance.totalValue - this.selectedItems.totalCost,
    };
    purchasedItems.purchasedItems.forEach((purchasedItem) => {
      this.inventory[purchasedItem].quantity -= 1;
    });
    this.storedBalance.addTransferredBalance(this.insertedBalance);
    this.insertedBalance.clearBalance();
    this.selectedItems.items = [];
    this.selectedItems.totalCost = 0;
    return purchasedItems;
  }

  cancelTransaction() {
    const refund = {
      onePence: { ...this.insertedBalance.onePence },
      fivePence: { ...this.insertedBalance.fivePence },
      tenPence: { ...this.insertedBalance.tenPence },
      twentyPence: { ...this.insertedBalance.twentyPence },
      fiftyPence: { ...this.insertedBalance.fiftyPence },
    };
    this.selectedItems.items = [];
    this.selectedItems.totalCost = 0;
    this.insertedBalance.clearBalance();
    return refund;
  }

  resetMachine() {
    this.inventory.coke.quantity = 10;
    this.inventory.tango.quantity = 10;
    this.inventory.water.quantity = 10;
    this.storedBalance = new Balance(100, 100, 100, 100, 100);
  }
}

module.exports = VendingMachine;
