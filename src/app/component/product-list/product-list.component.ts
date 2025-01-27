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

export class ProductListComponent implements OnInit {
  arrProductos: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  productService = inject(ProductoService);

  constructor(private productoService: ProductoService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.arrProductos = await this.productoService.getAllProducts(); 
      this.filteredProducts =  [...this.arrProductos];
    } catch(error) {
      console.log("Error cargando productos", error);
    }
  }

  async onProductDeleted(): Promise<void> {
    this.arrProductos = await this.productoService.getAllProducts();
    this.filteredProducts = this.productoService.filtrarProductos({});
  }

  aplicarFiltros(filtros: any): void {
    
    const filtrosParseados = {
      nombre: filtros.nombre || '',
      categoria: filtros.categoria || '',
      precioMin: filtros.precioMin ? Number(filtros.precioMin) : undefined,
      precioMax: filtros.precioMax ? Number(filtros.precioMax) : undefined,
      activo: filtros.activo || false
    };
    this.filteredProducts = this.productoService.filtrarProductos(filtrosParseados);
}
}