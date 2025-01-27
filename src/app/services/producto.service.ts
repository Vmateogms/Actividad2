import { inject, Injectable } from '@angular/core';
import { filter, lastValueFrom, Observable } from 'rxjs';
import { IProduct } from '../interface/iproducto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://jsonblob.com/api/1333516863627517952';
  private productos: IProduct[] = [];


  async getAllProducts(): Promise<IProduct[]> {
    if (this.productos.length === 0) {
      try {
        const respuesta = await fetch(this.apiUrl);
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        this.productos = await respuesta.json() || [];

        console.log('Datos iniciales cargados');
      } catch (error) {
        console.error('Error al cargar datos:', error);
        throw error;
      }
    }
    return this.productos;
  }

  eliminarProducto(id: string): void {
  this.productos = this.productos.filter((product) => product._id !== id);
}
  async agregarProducto(nuevoProducto: IProduct): Promise<void> {
    this.productos.push(nuevoProducto);
    await this.guardarCambios();
  }

  obtenerCategorias(): string[] {
    return [...new Set(this.productos.map(p => p.category))];
  }

  filtrarProductos(filtros: {nombre?: string; categoria?: string; precioMin?: number; precioMax?: number; activo?: boolean}): IProduct[] {
    return this.productos.filter(p => {
      const cumpleNombre = filtros.nombre ? 
        p.name.toLowerCase().includes(filtros.nombre.toLowerCase()) : true;
      
      const cumpleCategoria = filtros.categoria ? 
      p.category.toLowerCase() === filtros.categoria.toLowerCase() : true;
      
      const cumplePrecioMin = filtros.precioMin !== undefined ? 
      p.price >= filtros.precioMin : true;
    
      const cumplePrecioMax = filtros.precioMax !== undefined ? 
      p.price <= filtros.precioMax : true;
      
      const cumpleEstado = filtros.activo !== undefined ? 
        p.active === filtros.activo : true;

      return cumpleNombre && cumpleCategoria && cumplePrecioMin && cumplePrecioMax && cumpleEstado;
    });
  }

  private async guardarCambios(): Promise<void> {
    try {
      const respuesta = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.productos)
      });
      
      if (!respuesta.ok) throw new Error(`Error al guardar: ${respuesta.status}`);
      
      console.log('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      throw error;
    }
  }
}