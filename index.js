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

  insertCash(cash) {
    if (!this.acceptedCash.includes(cash)) return cash;
    this.insertedCash += cash;
  }

  selectItem(selectedItem) {
    if (!this.stock.hasOwnProperty(selectedItem)) return "invalid item";
    this.selectedItems.items.push(selectedItem);
    this.selectedItems.totalCost += this.stock[selectedItem].price;
  }

  purchaseItems() {
    if (this.insertedCash < this.selectedItems.totalCost)
      return "insufficient funds";
    const purchasedItems = {
      purchasedItems: [...this.selectedItems.items],
      change: this.insertedCash - this.selectedItems.totalCost,
    };
    this.insertedCash = 0;
    purchasedItems.purchasedItems.forEach((purchasedItem) => {
      this.stock[purchasedItem].quantity -= 1;
    });
    this.storedCash += this.selectedItems.totalCost;
    this.selectedItems.items = [];
    this.selectedItems.totalCost = 0;
    return purchasedItems;
  }

  cancelTransaction() {
    const refund = this.insertedCash;
    this.selectedItems.items = [];
    this.selectedItems.totalCost = 0;
    this.insertedCash = 0;
    return refund;
  }

  resetMachine() {
    this.stock.coke.quantity = 10;
    this.stock.tango.quantity = 10;
    this.stock.water.quantity = 10;
    this.storedCash = 1000;
  }
}

module.exports = VendingMachine;
