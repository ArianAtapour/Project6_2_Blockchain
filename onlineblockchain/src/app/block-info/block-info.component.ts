import {Component, Inject, Injectable, Input} from '@angular/core';
import {Block, Department, Product} from "../models/interfaces";
import {products} from "../models/products";

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class BlockInfoComponent {
  @Input() product: string;
  @Input() hash: number;
  @Input() id: number
  @Input() department: string;
  @Input() description: string;
  @Input() message: string;

  constructor() {
    this.product = "";
    this.hash = 0;
    this.id = 0;
    this.department = "";
    this.description = "";
    this.message = "";
  }

  getBlockProductName(product: Product) {
    return Product.getName(product);
  }

  protected readonly Department = Department;
  protected readonly Product = Product;
}
