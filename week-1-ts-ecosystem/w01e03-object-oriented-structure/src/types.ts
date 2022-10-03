export type Type = "Kup Teraz" | "Aukcja" | "Oddam Za Darmo"
export type Currency = "PLN"

export type Item = {
    name: string,
    price: number,
    currency: 'PLN',
    description?: HTMLElement,
    short: string,
    type?: Type,
    stock: number
}