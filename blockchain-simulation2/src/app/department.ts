export class Department {
  id: number
  name: string;
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

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
