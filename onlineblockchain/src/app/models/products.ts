import { Product, Checklist } from "./interfaces";

const checklistInstances: Record<number, Checklist> = {};

export function createChecklist(productId: number): Checklist {
  if (!checklistInstances[productId]) {
    checklistInstances[productId] = {
      hasProduct: false,
      approvedByFinance: false,
    };
  }
  return checklistInstances[productId];
}

export const products: Product[] = [
  {
    id: 0,
    name: "No Product",
    description: "NULL",
  },
  {
    id: 1,
    name: "Example Product",
    description: "This is an example product",
  },
  {
    id: 2,
    name: "Razer Laptop",
    description: "Cool looking laptop",
  },
  {
    id: 3,
    name: "Hairdryer",
    description: "Dryer to blow your hair",
  }
];

