import {DepartmentComponent} from "./department.component";
import {Inject, Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class Department {
  id: number;
  name: string;
  description: string;

  constructor(@Inject(Number) id: number, @Inject(String) name: string, @Inject(String) description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static createDepartment(id: number, name: string, description: string) {
    return new Department(id, name, description);
  }

  // static getColor(index: number): string {
  //   switch (index)
  //   {
  //     // case 1: return '#c37892';
  //     case 1: return '#FF8C83';
  //     case 2: return '#a4b6dd';
  //     case 3: return '#FFA56D';
  //     case 4: return '#c6a2cc';
  //     case 5: return '#a2d0c0';
  //     default: return 'white';
  //   }
  // }

  static getColor(index: number) {
    switch (index) {
      case 1: return '#FF6B61'; // Coral
      case 2: return '#7BA5D6'; // Vibrant pastel blue
      case 3: return '#FF945E'; // Updated slightly less vibrant pastel orange
      case 4: return '#B07AC4'; // Vibrant pastel purple
      case 5: return '#78C5A9'; // Vibrant pastel green
      default: return 'white';
    }
  }

  // static getColor(index: number): string {
  //   switch (index)
  //   {
  //     // case 1: return '#c37892';
  //     case 1: return '#FF8C83';
  //     case 2: return '#a2d0c0';
  //     case 3: return '#FFA56D';
  //     case 4: return '#c6a2cc';
  //     case 5: return '#a4b6dd';
  //     default: return 'white';
  //   }
  // }

  getId(){
    return this.id;
  }
  getName() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }

}
