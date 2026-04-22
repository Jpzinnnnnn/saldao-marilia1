import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: any;

  products = [
    {
      id: 1,
      name: 'Camiseta Básica Premium',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
      description: 'Camiseta premium confortável e moderna.',
      sizes: ['P', 'M', 'G', 'GG']
    },
    {
      id: 2,
      name: 'Calça Jeans Slim Fit',
      price: 67.49,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
      description: 'Calça jeans slim fit com ótimo caimento.',
      sizes: ['38', '40', '42', '44']
    },
    {
      id: 3,
      name: 'Tênis Esportivo Urban',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      description: 'Ideal para caminhada, treino e uso diário.',
      sizes: ['38', '39', '40', '41', '42']
    }
  ];

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
  }

  openWhatsapp(): void {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${this.product.name}`
    );

    window.open(
      `https://wa.me/5514991677085?text=${msg}`,
      '_blank'
    );
  }
}