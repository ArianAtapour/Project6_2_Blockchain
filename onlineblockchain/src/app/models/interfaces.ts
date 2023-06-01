


export interface Department {
  id: number;
  name: string;
  description: string;
}
export namespace Department {
  export function getColor(index: number): string {
    switch (index) {
      case 1: return '#FF6B61'; // Coral
      case 2: return '#7BA5D6'; // Vibrant pastel blue
      case 3: return '#FF945E'; // Updated slightly less vibrant pastel orange
      case 4: return '#B07AC4'; // Vibrant pastel purple
      case 5: return '#78C5A9'; // Vibrant pastel green
      default: return 'white';
    }
  }
  export function getId(department: Department) {
    return department.id;
  }
  export function getName(department: Department) {
    return department.name;
  }
  export function getDescription(department: Department) {
    return department.description;
  }
}
export interface Checklist {
  hasProduct: boolean; //1
  buyerToFinance: boolean; //2
  financeToBuyer: boolean; //3
  buyerToProducer: boolean; //2
  producerToFinance: boolean; //5
  financeToProducer: boolean; //3
  producerToShipper: boolean; //5
  shipperToFinance: boolean; //4
  financeToShipper: boolean; //3
  shipperToProducer: boolean; //4
  producerToBuyer: boolean; //5
  buyerToClient: boolean; //2
}

export namespace Checklist {
  export function firstStepDone(checklist: Checklist) {
    checklist.hasProduct = true;
  }

  export function secondStepDone(checklist: Checklist) {
    checklist.buyerToFinance = true;
  }

  export function thirdStepDone(checklist: Checklist) {
    checklist.financeToBuyer = true;
  }

  export function fourthStepDone(checklist: Checklist) {
    checklist.buyerToProducer = true;
  }

  export function fifthStepDone(checklist: Checklist) {
    checklist.producerToFinance = true;
  }

  export function sixthStepDone(checklist: Checklist) {
    checklist.financeToProducer = true;
  }

  export function seventhStepDone(checklist: Checklist) {
    checklist.producerToShipper = true;
  }

  export function eighthStepDone(checklist: Checklist) {
    checklist.shipperToFinance = true;
  }

  export function ninthStepDone(checklist: Checklist) {
    checklist.financeToShipper = true;
  }

  export function tenthStepDone(checklist: Checklist) {
    checklist.shipperToProducer = true;
  }

  export function eleventhStepDone(checklist: Checklist) {
    checklist.producerToBuyer = true;
  }

  export function twelfthStepDone(checklist: Checklist) {
    checklist.buyerToClient = true;
  }
}


export interface Product {
  id: number;
  name: string;
  description: string;
}
export namespace Product {
  export function getName(product: Product) {
    return product.name;
  }
  export function getId(product: Product) {
    return product.id;
  }
  export function getDescription(product: Product) {
    return product.description;
  }
}
export interface Block {
  hash: number;
  product: Product;
  department: Department;
  message: string;
  timestamp: Date;
  checklist: Checklist;
}
export namespace Block {
  export function getHash(block: Block) {
    return block.hash;
  }
  export function getChecklist(block: Block) {
    return block.checklist;
  }
  export function setHash(block: Block, hash: number) {
    block.hash = hash;
  }
  export function getProduct(block: Block) {
    return block.product;
  }
  export function getDepartment(block: Block) {
    return block.department;
  }
  export function getMessage(block: Block) {
    return block.message;
  }
  export function getTimestamp(block: Block) {
    return block.timestamp;
  }
  export function setTimestamp(block: Block, timestamp: Date) {
    block.timestamp = timestamp;
  }

}
