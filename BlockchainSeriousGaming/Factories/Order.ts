import { Factory } from './Factory';
class Order {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

// const order: Order = new Factory("Apple Software", 1324);
