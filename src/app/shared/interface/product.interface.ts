export interface Product {
  _id?: string;
  name: String;
  description: String;
  price: Number;
  images: [{
    uri: string;
    alt: string;
  }];
}
