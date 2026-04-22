import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  cartOpen = false;
  cartItems: any[] = [];

  constructor(public cart: CartService) {
    // escuta mudanças do carrinho automaticamente
    this.cart.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];
    this.cart.remove(item.id);
  }

  getTotal(): number {
    return this.cart.getTotal();
  }

  finishOrder(): void {
    const items = this.cartItems
      .map(i => `• ${i.name} x${i.quantity} - R$ ${(i.price * i.quantity).toFixed(2)}`)
      .join('%0A');

    const total = this.getTotal().toFixed(2);

    const msg =
      `Olá! Quero finalizar meu pedido:%0A%0A${items}%0A%0ATotal: R$ ${total}`;

    window.open(`https://wa.me/5514991677085?text=${msg}`, '_blank');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  scrollTo(section: string): void {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });

    this.closeMobileMenu();
  }
}