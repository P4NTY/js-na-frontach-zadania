/**
 * To tutaj mamy "START" programu.
 *
 * Przygotuj tutaj kawałek kodu potwierdzający poprawność działania koszyka.
 *
 * Np. Utwórz 3 różne koszyki — dodaj do nich różne produkty.
 * Potem wyświetl te produkty.
 * Wykaż, że koszyki mają różne produkty — inną ich ilość etc.
 * Przygotuj koszyki dla każdego rodzaju produktów.
 * - po prostu: wykaż, że przygotowana logika i modele danych — działają :)
 * */
import { Basket, Product } from "./classes";
import { Type } from "./types";

const offerType: Type[] = ["Kup Teraz" , "Aukcja" , "Oddam Za Darmo" ];
const baskets: Basket[] = offerType.map( type => new Basket(type) );

const random = (range: number) => Math.floor(Math.random()*range) + 1;
const stockLimit = 10;

const createProducts = (amount: number, type?: Type) => {
    const shop: Product[] = [];
    
    for (let index = 1; index <= amount; index++) {
        const productType = offerType[random(3)];
        shop.push(
            new Product({
                name: 'Produkt_'+random(100),
                type: type??productType,
                description: document.createElement('p'),
                price: productType !== offerType[2] ? random(100) + (random(10)/100) : 0,
                short: 'Short Desc',
                stock: random(stockLimit),
            })
        )
    }

    return shop;
}

function addToBasket(cart:Basket, product:Product, amount:number) {
    if ( product.getStock() - amount < 0 ) { console.warn('Za mało produktu na stanie'); return; }
    if (cart.getType() !==  product.getType()) { console.warn('Niewłasciwy koszyk'); return; }

    product.changeStock(amount*-1);

    const productIndex = cart.seeBasket().map( ({product}) => product.name ).indexOf(product.previewProduct().name)
    if ( productIndex !== -1 ) cart.addProduct(productIndex, amount);
    else cart.newProduct(product, amount);
}

//Dodanie własciwego produktu do koszyka
const aProduckt =  createProducts(1, offerType[1])[0];
console.log(aProduckt.viewProduct());

addToBasket(baskets[1], aProduckt, 1);
console.log(aProduckt.viewProduct());
console.log(baskets[1].seeBasket());

//Dodanie niewłasciwego produktu do koszyka
const nProduckt =  createProducts(1, offerType[0])[0];
console.log(nProduckt.viewProduct());

addToBasket(baskets[1], nProduckt, 1);
console.log(nProduckt.viewProduct());
console.log(baskets[1].seeBasket());

//Dodanie za dużej liczby produktów
const aProduckt_1 =  createProducts(1, offerType[1])[0];
console.log(aProduckt_1.viewProduct());

addToBasket(baskets[1], aProduckt_1, 100);
console.log(aProduckt_1.viewProduct());
console.log(baskets[1].seeBasket());

//Pokazanie sum
const arrProducts = createProducts(10, offerType[1]);
console.log( arrProducts.map( product => product.previewProduct() ) );
arrProducts.forEach( product => {
    addToBasket(baskets[1], product, random(10))
});
addToBasket(baskets[1], aProduckt, 1);
console.log({
    cart: baskets[1].seeBasket(),
    total: baskets[1].getTotalPrice(),
    amount: baskets[1].getTotalAmount()
})