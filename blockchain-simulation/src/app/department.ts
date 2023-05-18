import {Inject, Injectable} from '@angular/core';
import {Color} from "./color";
@Injectable({
  providedIn: 'root'
})
export class Department {
  public name: string = "";
  public description: string = "";
  public color: number = Color.Black;

  // constructor(@Inject(String) name: string, @Inject(String) description: string, @Inject(Number) color: number) {
  //   this.name = name;
  //   this.description = description;
  //   this.color = color;
  // }
}
