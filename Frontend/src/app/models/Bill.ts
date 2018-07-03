export class Bill{
    public name: String;
    price: Number;
    // date: {
    //   type: Date,
    //   default: Date.now
    // },
    date: Date;
    // products: Array;
    type: String;
    extra: String;
    createdAt: Date;

    constructor(name: String, type: String, price: Number, date: Date, extra = null) {
      this.name = name;
      this.type = type;
      this.price = price;
      this.date = date// Date.now.toString()
      this.extra = extra
    }
  }