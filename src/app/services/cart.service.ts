import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.items$.asObservable();

  addItem(product: any) {
    const found = this.items.find(i => i.id === product.id);

    if (found) {
      found.quantity++;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }

    this.sync();
  }

  increase(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) item.quantity++;
    this.sync();
  }

  decrease(id: number) {
    const item = this.items.find(i => i.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
      this.remove(id);
    } else {
      this.sync();
    }
  }

  remove(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.sync();
  }

  clear() {
    this.items = [];
    this.sync();
  }

  getCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  private sync() {
    this.items$.next([...this.items]);
  }
}