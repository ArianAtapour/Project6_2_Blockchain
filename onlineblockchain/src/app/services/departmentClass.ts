import {Department} from "../models/interfaces";
import {Inject} from "@angular/core";

export class DepartmentClass implements Department {
  constructor(@Inject(Number) public id: number, @Inject(String) public name: string, @Inject(String) public description: string) {}
}
