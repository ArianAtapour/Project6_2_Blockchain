import {Role} from "./player";

export class Message {
  private static instance : Message;
  private _content : string = "";
  private _role : Role = Role.None;

}
