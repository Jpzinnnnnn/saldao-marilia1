import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  tagColor?: string;
  category: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  activeCategory = 'todos';

  constructor(
  private cdr: ChangeDetectorRef,
  private cartService: CartService
) {}

  categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'masculino', label: 'Masculino' },
    { id: 'feminino', label: 'Feminino' },
    { id: 'infantil', label: 'Infantil' },
    { id: 'calcados', label: 'Calçados' },
  ];

  allProducts: Product[] = [
    {
      id: 1,
      name: 'Camiseta Básica Premium',
      price: 9.99,
      oldPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
      tag: 'QUEIMA!',
      tagColor: '#FF1744',
      category: 'masculino'
    },
    {
      id: 2,
      name: 'Calça Jeans Slim Fit',
      price: 67.49,
      oldPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
      tag: '-25% OFF',
      tagColor: '#FF6F00',
      category: 'masculino'
    },
    {
      id: 3,
      name: 'Tênis Esportivo Urban',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      category: 'calcados'
    },
    {
      id: 4,
      name: 'Vestido Floral Verão',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
      category: 'feminino'
    },
    {
      id: 5,
      name: 'Conjunto Infantil',
      price: 39.99,
      image: 'https://malwee.vtexassets.com/arquivos/ids/687280-805-1010',
      category: 'infantil'
    },
    {
      id: 6,
      name: 'Blusa Feminina Social',
      price: 34.99,
      image: 'https://cdn.awsli.com.br/2500x2500/2705/2705960/produto/308473642/9e2a1cab112532ceee53842f7d6d3583-jmag1pqohk.jpg',
      category: 'feminino'
    },
    {
      id: 7,
      name: 'Bermuda Masculina Cargo',
      price: 64.99,
      image: 'https://torratorra.vtexassets.com/arquivos/ids/2194952/21552000375173.jpg?v=638799137115100000',
      category: 'masculino'
    },
    {
      id: 8,
      name: 'Sandália Feminina Confort',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&q=80',
      category: 'calcados'
    },
  ];

  filteredProducts: Product[] = [];

  ngOnInit() {
    this.filteredProducts = this.allProducts;
  }

  trackById(index: number, item: Product) {
    return item.id;
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;

    if (cat === 'todos') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(
        p => p.category === cat
      );
    }

    this.cdr.detectChanges();
  }

  openWhatsapp(productName: string): void {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${productName}. Ainda está disponível?`
    );

    window.open(
      `https://wa.me/5514991677085?text=${msg}`,
      '_blank'
    );
  }

  getDiscount(product: Product): number {
    if (!product.oldPrice) return 0;

    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  }
addToCart(product: Product): void {
  this.cartService.addItem(product);
}
}
