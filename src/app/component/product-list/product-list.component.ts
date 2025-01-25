import { Component, inject, Injectable, OnInit } from '@angular/core';
import { IProduct } from '../../interface/iproducto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {


arrProductos: IProduct[] = []
ProductoService = inject(ProductoService);

ngOnInit(): void {
  this.arrProductos = this.ProductoService.getAllProductos();
  console.log(this.arrProductos);
}




















//mas reciente  
//   ProductoService = inject(ProductoService)
//   arrProductos: IProduct[];


//   constructor() {
//     this.arrProductos =[];
//   }


// async  ngOnInit() {

//   //promesas
// try {
//   this.arrProductos = await this.ProductoService.getAllWithPromises();
// } catch (err) {
//   console.log('Error al conetar a la API: ' + err);
// }









// onDelete(id: string): void {
//   this.productoService.delete(id).subscribe({
//     next: () => {
//       this.productos = this.productoService.getProducto();
//     },
//     error: (err) => {
//       console.error('error',err);
//     },
//   });
// }

}
