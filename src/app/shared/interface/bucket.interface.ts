export interface Bucket {
  _id?: string;
  products: [{
    product: {
      name: string;
      price: Number;
    };
    volume: Number;
  }];
  price: Number;
  userId: string;
}
