class Item {
  constructor(itemName, itemPrice, count) {
    count
      ? (this[itemName] = { itemName, itemPrice, count })
      : (this[itemName] = { itemName, itemPrice });
  }
}

class Inventory {
  constructor(items) {
    if (!items) return;
    items.forEach((item) => {
      this.addItem(item);
    });
  }

  get totalValue() {
    let totalValue = 0;
    Object.values(this).forEach((value) => {
      totalValue += value.itemPrice * value.count;
    });
    return totalValue;
  }

  clearItems() {
    for (let key in this) {
      delete this[key];
    }
  }

  addItem(item) {
    const itemKey = Object.keys(item)[0];
    if (this[itemKey]) {
      this[itemKey].count += item[itemKey].count || 1;
    } else {
      this[itemKey] = { ...Object.values(item)[0] };
      this[itemKey].count = item[itemKey].count || 1;
    }
  }
}

class Basket extends Inventory {
  purchaseItems() {
    const purchasedItems = { ...this };
    this.clearItems();
    return purchasedItems;
  }
}

class Balance {
  constructor(
    onePence = 0,
    fivePence = 0,
    tenPence = 0,
    twentyPence = 0,
    fiftyPence = 0
  ) {
    this._onePence = { count: onePence, value: 1 };
    this._fivePence = { count: fivePence, value: 5 };
    this._tenPence = { count: tenPence, value: 10 };
    this._twentyPence = { count: twentyPence, value: 20 };
    this._fiftyPence = { count: fiftyPence, value: 50 };
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
        this._onePence.count++;
        break;
      case 5:
        this._fivePence.count++;
        break;
      case 10:
        this._tenPence.count++;
        break;
      case 20:
        this._twentyPence.count++;
        break;
      case 50:
        this._fiftyPence.count++;
        break;
    }
  }

  addTransferredBalance(transferredBalance) {
    this._onePence.count += transferredBalance._onePence.count;
    this._fivePence.count += transferredBalance._fivePence.count;
    this._tenPence.count += transferredBalance._tenPence.count;
    this._twentyPence.count += transferredBalance._twentyPence.count;
    this._fiftyPence.count += transferredBalance._fiftyPence.count;
  }

  clearBalance() {
    this._onePence.count = 0;
    this._fivePence.count = 0;
    this._tenPence.count = 0;
    this._twentyPence.count = 0;
    this._fiftyPence.count = 0;
  }
}

class VendingMachine {
  // #_acceptedCash;
  constructor() {
    this._acceptedCash = [1, 5, 10, 20, 50];
    this._inventory = new Inventory([
      new Item("coke", 55, 10),
      new Item("tango", 35, 10),
      new Item("water", 45, 10),
    ]);
    this._storedBalance = new Balance(100, 100, 100, 100, 100);
    this._insertedBalance = new Balance();
    this._selectedItems = new Basket();
  }

  insertCash(cash) {
    if (!this._acceptedCash.includes(cash)) return cash;
    this._insertedBalance.addToBalance(cash);
  }

  selectItem(selectedItem) {
    if (!this._inventory.hasOwnProperty(selectedItem)) return "invalid item";
    this._selectedItems.addItem(
      new Item(
        this._inventory[selectedItem].itemName,
        this._inventory[selectedItem].itemPrice
      )
    );
  }

  purchaseItems() {
    if (this._insertedBalance.totalValue < this._selectedItems.totalValue)
      return "insufficient funds";
    const change =
      this._insertedBalance.totalValue - this._selectedItems.totalValue;
    const purchasedItems = {
      purchasedItems: this._selectedItems.purchaseItems(),
      change,
    };
    for (let key in purchasedItems.purchasedItems) {
      this._inventory[key].count -= purchasedItems.purchasedItems[key].count;
    }
    this._storedBalance.addTransferredBalance(this._insertedBalance);
    this._insertedBalance.clearBalance();
    return purchasedItems;
  }

  cancelTransaction() {
    const refund = {
      onePence: {
        ...this._insertedBalance._onePence,
      },
      fivePence: {
        ...this._insertedBalance._fivePence,
      },
      tenPence: {
        ...this._insertedBalance._tenPence,
      },
      twentyPence: {
        ...this._insertedBalance._twentyPence,
      },
      fiftyPence: {
        ...this._insertedBalance._fiftyPence,
      },
    };
    this._selectedItems.clearItems();
    this._insertedBalance.clearBalance();
    return refund;
  }

  resetMachine() {
    this._inventory.clearItems();
    this._storedBalance.clearBalance();
  }
}

module.exports = VendingMachine;
