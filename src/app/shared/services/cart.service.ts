import {signal, WritableSignal} from '@angular/core';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: WritableSignal<number[]> = signal([]);

  public getCart(): number[] {
    return this.cart();
  }

  public addToCart(itemId: number): void {
    this.cart.update(cart => [...cart, itemId]);
  }

  public removeAllFromCart(itemId: number): void {
    this.cart.update(cart => cart.filter(cartItemId => cartItemId !== itemId));
  }

  public removeOneFromCart(itemId: number): void {
    const cart = this.cart();
    const itemIndex = cart.findIndex(cartItemId => cartItemId === itemId);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      this.cart.update(() => cart);
    }
  }

  public removeCustomFromCart(itemId: number, quantityRemoved: number): void {
    let quantityRemovedCounter = 0;
    while (quantityRemovedCounter < quantityRemoved) {
      this.removeOneFromCart(itemId);
      quantityRemovedCounter++;
    }
  }

  public clearCart(): void {
    this.cart.update(() => []);
  }

  public getCartItemQuantity(itemId: number): number {
    return this.cart().filter(cartItemId => cartItemId === itemId).length;
  }

  public getCartItemsCount(): number {
    return this.cart().length;
  }

  public getCartItemDictionary(): { [itemId: number]: number } {
    const cart = this.cart();
    return cart.reduce((acc: { [itemId: number]: number }, itemId) => {
      acc[itemId] = acc[itemId] ? acc[itemId] + 1 : 1;
      return acc;
    }, {});
  }
}
