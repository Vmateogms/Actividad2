import { Component, inject, Injectable, OnInit } from '@angular/core';
import { IProduct } from '../../interface/iproducto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { ProductFilterComponent } from "../product-filter/product-filter.component";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {


arrProductos: IProduct[] = []
ProductoService = inject(ProductoService);
filteredProducts: IProduct[] = [];



ngOnInit(): void {
  this.arrProductos = this.ProductoService.getAllProductos();
  console.log("Productos cargados:", this.arrProductos);
  this.filteredProducts = [...this.arrProductos];
  
}

FiltersViewChange(filters: any): void {
  console.log("Filtros recibidos:", filters);
  this.filteredProducts = this.ProductoService.filterProductos(filters);
}


}
