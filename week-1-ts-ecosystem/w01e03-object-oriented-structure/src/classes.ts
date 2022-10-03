import { Currency, Type, Item } from "./types";

/**
 * Koszyk będzie obsługiwał takie operacje jak:
   - dodanie produktu
   - pobranie (odczyt) jednego produktu po `id`
   - aktualizacja produktu po `id`
   - usunięcie produktu
   - odczyt wszystkich produktów
   - informacja o ilości produktów w koszyku
   - informacja o sumie cen produktów w koszyku
 */

export class Basket {
    #list: {
        item: Product,
        amount: number,
    }[];
    #type: Type

    constructor(type: Type) {
        this.#type = type; 
        this.#list = [];
    }
    //view
    seeBasket = () => this.#list.map( ({item,amount}) => ({product: item.previewProduct(), amount: amount}) );
    getProduct = ( index:number ) => ({
        product: this.#list[index].item.viewProduct(),
        amount: this.#list[index].amount
    });
    getType = () => this.#type;
    //aggregate
    getTotalPrice = () => this.#list.map( ({item}, amount) => item.getPrice() * amount ).reduce( (val,agg) => agg + val );
    getTotalAmount = () => this.#list.map( ({amount}) => amount ).reduce( (val,agg) => agg + val );
    //mutation
    newProduct = ( elem: Product, number = 1 ) => {
        if (elem.getType() !== this.#type) {
            console.warn('Próba dodania niewłasciwego produktu');           
            return;
        }
        this.#list.push({amount: number, item:elem});
    }
    addProduct = ( index: number, number = 1 ) => this.#list[index].amount += number;
    deleteProduct = (index: number) => {
        delete this.#list[index];
        this.#list = this.#list.filter( item => item )
    }
    removeProduct = ( index: number, number = 1) => {
        if (this.#list[index].amount <= number) { this.deleteProduct(index); return; }
        this.#list[index].amount -= number;
    }
}



export class Product {
    #name: string
    #price: number
    #currency: Currency
    #description: HTMLElement
    #short: string
    #type: Type
    #stock: number

    constructor({ name, price, description, short, type, stock }:{name:string, price:number, description:HTMLElement, short:string, type:Type, stock:number}) {
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#short = short;
        this.#type = type;
        this.#currency = "PLN";
        this.#stock = stock;
    }

    //view
    previewProduct = (): Item => ({
        name: this.#name,
        price: this.#price,
        currency: this.#currency,
        short: this.#short,
        stock: this.#stock
    })
    viewProduct = (): Item => ({
        name: this.#name,
        price: this.#price,
        currency: this.#currency,
        short: this.#short,
        description: this.#description,
        type: this.#type,
        stock: this.#stock,
    })
    getPrice = () => this.#price;
    getStock = () => this.#stock;
    getType = () => this.#type;
    //mutation
    changeStock = (number: number) => {
        if (this.#stock + number < 0) throw new Error("Próba wzięcia za dużej ilości produktów");
        this.#stock += number;
    }
}