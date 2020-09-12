export interface Command {
  _id?: string;
  clientInformation: {
    billingAddress: {
      name: string;
      address: string;
      city: string;
      postCode: string;
    };
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      postCode: string;
    };
  };
  products: [{
    product: {
      name: string;
      price: Number;
    };
    volume: Number;
  }];
  price: Number;
  status: {
    name: string;
    sendingDate: string;
    tracking: string;
  };
  created_date: string;
}
