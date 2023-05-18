import {Department} from "./department";
import {Color} from "./color";

export const Client: Department = {
  name : 'Client',
  description: 'Wants things.',
  color: Color.Red,
};

export const Buyer: Department = {
  name : 'Buyer',
  description: 'Buys things.',
  color: Color.Green,
};

export const Financier: Department = {
  name : 'Financier',
  description: 'Finances things.',
  color: Color.Blue,
};

export const Shipper: Department = {
  name : 'Shipper',
  description: 'Ships things.',
  color: Color.Yellow,
};

export const Producer: Department = {
  name : 'Producer',
  description: 'Makes things.',
  color: Color.Pink,
};

// export const Supplier = new Department("Supplier", "Supplies things");
