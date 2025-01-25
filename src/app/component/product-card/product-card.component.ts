import { Component, Input, input, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProduct } from '../../interface/iproducto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() miProducto!: IProduct;
productoService = inject(ProductoService)


deleteProducto(producto: IProduct) 
{ this.productoService.deleteByName(producto.name); }
}
