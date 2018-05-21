export class Bill{
    public name: String;
    price: Number;
    date: Date;
    // products: Array;
    type: String;
    extra: String;
    createdAt: Date;

    constructor(name: String, price: Number, date: Date) {
      this.name = name;
      this.price = price;
      this.date = date// Date.now.toString()
    }
  }