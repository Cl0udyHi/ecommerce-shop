import type { CartProduct } from "./types";
type Subscriber = (products: CartProduct[]) => void;

class Cart {
  private content: CartProduct[] = [];
  private subscribers: Subscriber[] = [];

  public getContent() {
    return this.content;
  }

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      this.content = stored ? JSON.parse(stored) : [];
    }
  }

  public subscribe(fn: Subscriber) {
    this.subscribers.push(fn);
    fn(this.content); // immediately send current state
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== fn);
    };
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.content));
  }

  public checkout() {}

  public getTotal(): number {
    const currencyCode =
      this.content[0]?.product.priceRange.minVariantPrice.currencyCode;
    let total: number = this.content.reduce(
      (sum, cartProduct) =>
        sum +
        Number(cartProduct.product.priceRange.minVariantPrice.amount) *
          cartProduct.quantity,
      0
    );

    return Math.round(total * 100) / 100;
  }

  public addProduct(product: CartProduct) {
    this.content.unshift(product);
    this.save();
    this.notify();
  }

  public removeProduct(product: CartProduct) {
    this.content = this.content.filter((prod) => prod.id !== product.id);
    this.save();
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(this.content));
    }

    this.notify();
  }
}

const MyCart = new Cart();
export default MyCart;
