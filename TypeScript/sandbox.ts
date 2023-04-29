import { Invoice } from './classes/Invoice.js';
import { Payment } from "./classes/payment.js";
import { HasFormatter } from "./HasFormatter.js";
import {ListTemplate} from "./classes/ListTemplate.js";

let docOne:HasFormatter;
let docTwo:HasFormatter;

docOne = new Invoice('inv1', 'some work', 80);
docTwo = new Invoice('inv2', 'some other work', 180);

let docs:HasFormatter[] = [];
docs.push(docOne);
docs.push(docTwo);

console.log(docs);

/*const character = "test";
console.log(character);

const inputs = document.querySelectorAll('input'); //takes all inputs from the document
console.log(inputs);

inputs.forEach(input => { //get all inputs
    console.log(input);
});*/

/*
//Type basics
let character = "test";
let age = 30;
let isFun = false;

//character = 20; //we cant change the type if it was set initially as string
character = "Changed";

const circ = (diameter:number) =>{ //diameter of type number
    return diameter = diameter*Math.PI;
}

console.log(circ(10));
 */

/*
//Objects & Arrays
let names = ['Arian', 'Dimi', 'Evald'];

names.push("Alex");
//names.push(3); //won't work because array is of type string

let mixed = ["test", 4, "smth"];
mixed.push(6);

//objects
let human = {
    name:"Arian",
    status:"Cool",
    age:20
}

//human.age = 'string'; //won't work
human.age = 30; //works
*/


/*
//Explicit types

//explicit type
let character:string[] = []; //empty array otherwise we can't push to it

//arrays
let testArr:string[]; //can only take an array of strings

//union types (mixed arrays, we can use more types specified)
let mixedArr:(string|number|boolean)[] = []; //() means union type, accepts only string or number or boolean

//objects
let testObj:object; //variable accepts only object values
testObj = {name:"TestName", age:30}
testObj = []; //arrays work because arrays are a kind of object

let testObjTwo:{
    name:string,
    age:number
}

testObjTwo = {name:"Arian", age:20}; //we can't put more or less proprieties
*/

/*
//Any type
let age:any = 25; //variable can be of any type
//the variable is not of type number cause of 25 but of type any
 */

//Better Workflow & tsconfig

//Functions
/*let greet = () => {
    console.log("Hello")
}*/

/*
console.log("Hello");

let greet: Function;

greet = () => {
    console.log('hello !');
}

const add = (a:number, b:number, c?:number|string) => { //means the third value c is optional, empty is undefined
    console.log(a+b);
    console.log(c);
}

add(2,2);

//For returning a fucntion

const minus = (a:number, b:number):number => {
    return a+b;
}

let result = minus(10,7);
//result = 'something else'; //wont work because the return type was set to be a number by the two parameters number
 */

//Type aliasses
//type stringOrNum = string | number;

//Function signatures
//Template string dynamically output data inside a string

/*let calc:(a:number, b:number, c:string) => number; //this is the signature it expects to return a number

calc = (numOne:number, numTwo:number, action:string) => {
    if(action == 'add'){
        return numOne + numTwo; //if you only leave the if there is the danger of returning a string and the signature says that it wants a number so it won't work
    }else{
        return numOne - numTwo;
    }
    */

//Application development from the tutorial

/*const anchor = document.querySelector('a');

if(anchor){
    console.log(anchor.href);
}*/

//console.log(anchor.href); //we run this without the if statement because it does not exist inside the html file (a selector)

//Special types for every DOM element, typescript knows all DOM functions and so on

//const form = document.querySelector('form')!; //! mark says I know it exists
const form = document.querySelector('.new-item-form') as HTMLFormElement; //because we pass a class it identifies as an element

//Type casting to tell TS what the type of element is gonna be (as HTMLFormElement)

//console.log(form.children);

//inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details  = document.querySelector('#details') as HTMLSelectElement;
const amount  = document.querySelector('#amount') as HTMLSelectElement;


//list template instance
const ul = document.querySelector('ul')!; //grab the ul from the index html document, by adding a ! we tell typescript it tells that it's definitely in thepage
const list = new ListTemplate(ul);


form.addEventListener('submit', (e:Event) => {
    e.preventDefault();

    let doc:HasFormatter;
    if(type.value === 'invoice'){
        doc = new Invoice(tofrom.value, details.value, parseInt(amount.value));
    }else{
        doc = new Payment(tofrom.value, details.value, parseInt(amount.value));
    }

    list.render(doc, type.value, 'end');
    /*console.log(
        type.value,
        tofrom.value,
        details.value,
        amount.value
    );*/

    console.log(doc);
});

//Classes
/*
class Invoice{
    readonly client:string;
    private details:string;
    public amount:number;

    constructor(c:string,d:string,a:number) {
        this.client = c;
        this.details = d;
        this.amount = a;
    }

    //Method
    format(){
        return `${this.client} owes £${this.amount} for ${this.details}`;
    }
}
*/

//instantiate class
/*
const invOne = new Invoice('test', 'work on test', 250);

console.log (invOne);

let invoices:Invoice[] = []; //only accepts invoice objects in the array
invoices.push(invOne);
*/


interface isPerson{
    name:string;
    age:number;
    speak(a: string):void; //takes a string parameter and returns void
    spend(a:number):number;
}

const me:isPerson = {
    name:"Arian",
    age:21,
    speak(text:string):void{
        console.log(text);
    },
    spend(amount: number): number {
        console.log('I spent', amount);
        return amount;
    }

    //Adding more properties won't work because they are not inside the interface
}

/*invoices.forEach(inv => {
   console.log(inv.client, inv.amount, inv.format());
});*/

console.log(me);

//GENERICS
const addUID = <T extends object>(obj:T) => {
    let uid = Math.floor(Math.random()*100);
    return {...obj, uid}; //...obj will spit out the object properties with the uid it's given in this case a random number
}

let testGen = addUID({name: 'test', age:60}); //this is the object

console.log(testGen);

//console.log(testGen.name); //it is gonna be an error because when we pass the object it doesn not know the properties ...obj is not known what properties it is gonna return
//and that's why we use generics <T> after that we can access the properties as well but the object wont be of type object anymore but of type T a generic
//To ge around this we do <T extends object> so whatever passes through the generic MUST be of object type
//More specific we can allow only objects with certain properties for example <T extends {name:string}> will allow only objects that have the property of name of type string


//Generics with interfaces
interface Resource<T>{ //we define the type when we pass the Resource object we define....
    uid:number;
    resourceName:string;
    data:T; //... the type for this
}

const testInGeneric: Resource<object> = {
    uid:1,
    resourceName: 'person',
    data:{name:'shaun'}
}

const testInterArr:Resource<string[]> = {
    uid:2,
    resourceName: 'shoppingList',
    data:['bread', 'milk', 'cereals']
}

console.log(testInGeneric, testInterArr);

//ENUMS
enum ResourceType{
    BOOK,AUTHOR,FILM,DIRECTOR,PERSON //each enum is associated with a number from 0 onwards when we console log the enum its gonna be from 0 onwards.
}

interface ResourceEnum<T>{
    uid:number;
    resourceType:ResourceType;
    data:T;
}

const enumTest:ResourceEnum<object> = {
    uid:3,
    resourceType:ResourceType.AUTHOR, //usage of enum
    data:{title:'name of the wind'}
}

console.log(enumTest);

//Tuples
/*
A tuple is a typed array with a pre-defined length and types for each index.
Tuples are great because they allow each element in the array to be a known
type of value.
https://www.w3schools.com/typescript/typescript_tuples.php#:~:text=A%20tuple%20is%20a%20typed,a%20known%20type%20of%20value.
*/

let tup:[string, number, boolean] = ['testTuple', 25, true]; //this is how we define a tuple in TS, we expect the following types inside the array string, number and boolean
//You can't change on the position of a string to have a number for example
//tup[0] = 25; //wont work
tup[0] = 'another string'; //but I can change it to another string

//As an fyi we can do it for 2 elements as well it does not to be 3 let tup:[string, number], the advantage is that we know the type
//The thing with tuples is that in vanilla java you can do whatever you want change it to any type but the rule with tuples is that you set like a 'template' to which you know what data types u expect.
