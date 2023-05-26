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

  value1: string = "";
  value2: string = "";
  moveValue(sourceProperty: string, targetProperty: string) {
    // @ts-ignore
    this[targetProperty] += this[sourceProperty] + "\n";
    // @ts-ignore
    this[sourceProperty] = '';
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
