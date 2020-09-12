export interface User {
  _id?: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  billingAddress: [{
    name: string;
    address: string;
    city: string;
    postCode: string;
  }];
  shippingAddress: [{
    name: string;
    address: string;
    city: string;
    postCode: string;
  }];
  role: number;
}
