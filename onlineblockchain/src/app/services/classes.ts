import {Checklist, Department} from "../models/interfaces";
import {Inject} from "@angular/core";

export class ChecklistClass implements Checklist {
  hasProduct: boolean;
  buyerToFinance: boolean;
  financeToBuyer: boolean;
  buyerToProducer: boolean;
  producerToFinance: boolean;
  financeToProducer: boolean;
  producerToShipper: boolean;
  shipperToFinance: boolean;
  financeToShipper: boolean;
  shipperToProducer: boolean;
  producerToBuyer: boolean;
  buyerToClient: boolean;

  constructor(checklist: Checklist) {
    this.hasProduct = false;
    this.buyerToFinance = false;
    this.financeToBuyer = false;
    this.buyerToProducer = false;
    this.producerToFinance = false;
    this.financeToProducer = false;
    this.producerToShipper = false;
    this.shipperToFinance = false;
    this.financeToShipper = false;
    this.shipperToProducer = false;
    this.producerToBuyer = false;
    this.buyerToClient = false;

    // You can copy the values from the checklist parameter if needed
    if (checklist) {
      this.hasProduct = checklist.hasProduct;
      this.buyerToFinance = checklist.buyerToFinance;
      this.financeToBuyer = checklist.financeToBuyer;
      this.buyerToProducer = checklist.buyerToProducer;
      this.producerToFinance = checklist.producerToFinance;
      this.financeToProducer = checklist.financeToProducer;
      this.producerToShipper = checklist.producerToShipper;
      this.shipperToFinance = checklist.shipperToFinance;
      this.financeToShipper = checklist.financeToShipper;
      this.shipperToProducer = checklist.shipperToProducer;
      this.producerToBuyer = checklist.producerToBuyer;
      this.buyerToClient = checklist.buyerToClient;
    }
  }
}




export class DepartmentClass implements Department {
  constructor(@Inject(Number) public id: number, @Inject(String) public name: string, @Inject(String) public description: string) {}
}
