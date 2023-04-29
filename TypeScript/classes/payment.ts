import {HasFormatter} from "../HasFormatter.js";

export class Payment implements HasFormatter{
    constructor(
        readonly recipient: string,
        private details: string,
        public amount: number
    ){}

    //Method
    format(){
        return `${this.recipient} owes £${this.amount} for ${this.details}`;
    }
}

