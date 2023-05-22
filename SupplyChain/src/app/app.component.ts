import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SupplyChain';
  senderGMaster : string = "";
  senderFinancier : string = "";
  senderBuyer : string = "";
  senderShipper : string = "";
  senderProducer : string = "";
  receiverGMaster : string = "";
  receiverBuyer : string = "";
  receiverShipper : string = "";
  receiverProducer : string = "";
  receiverFinancier : string = "";

  goodNumber : number = 0;
  badNumber : number = 0;
  //Text transfer methods, all separate because I didn't figure it out yet
  GMasterToBuyer()
  {
    this.receiverBuyer += this.senderGMaster + "\n";
  }
  BuyerToShipper()
  {
    this.receiverShipper += this.senderBuyer + "\n";
  }
  ShipperToProducer()
  {
    this.receiverProducer += this.senderShipper + "\n";
  }
  ProducerToBuyer()
  {
    this.receiverBuyer += this.senderProducer + "\n";
  }
  BuyerToFinancier()
  {
    this.receiverFinancier += this.senderBuyer + "\n";
  }
  ShipperToFinancier()
  {
    this.receiverFinancier += this.senderShipper + "\n";
  }
  ProducerToFinancier()
  {
    this.receiverFinancier += this.senderProducer + "\n";
  }
  FinancierToBuyer()
  {
    this.receiverBuyer += this.senderFinancier + "\n";
  }
  BuyerToClient()
  {
    this.receiverGMaster += this.senderBuyer;
  }
  FinancierToShipper()
  {
    this.receiverShipper += this.senderFinancier + "\n";
  }
  FinancierToProducer()
  {
    this.receiverProducer += this.senderFinancier + "\n";
  }
  ProductGood()
  {
    this.goodNumber++;
  }
  ProductBad()
  {
    this.badNumber++;
  }
}
