export class MsgTable {
  //singleton so that each class references the same table
  private static instance : MsgTable;

  private _id : string = "";
  private _message : string = "";
  private _role : Role = Role.None;

  private constructor(){}

  static getInstance(): MsgTable {
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

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
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
