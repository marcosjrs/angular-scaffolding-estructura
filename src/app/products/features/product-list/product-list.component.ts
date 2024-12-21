import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../data-access/products.service';
import ProductCardComponent from '../../ui/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
})
export default class ProductListComponent {
  productService = inject(ProductService);

  products = toSignal(this.productService.getProducts());
  route = inject(ActivatedRoute);
  title = '';

  ngOnInit(){
    this.route.title.subscribe(d => this.title = d || '');
  }

  buy(product: Product) {
    alert(`You bought ${product.name}`);
  }
}
