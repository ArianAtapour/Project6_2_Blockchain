export class Player {
  //singleton so that each class references the same player
  private static instance : Player;

  private _id : string = "";
  private _name : string = "";
  private _message : string = "";
  private _role : Role = Role.None;

  private constructor(){}

  static getInstance(): Player {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }
}

export enum Role {
  None,
  Producer,
  Buyer,
  Shipper,
  Company,
  Gamemaster
}
