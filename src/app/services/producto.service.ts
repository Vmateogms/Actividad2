import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IProduct } from '../interface/iproducto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private arrProductos: IProduct[];

  constructor(private http: HttpClient) {
    this.arrProductos = [];
    //JsonBlob solo permite POST y GET. Todo lo de eliminacion es en local.
    fetch("https://jsonblob.com/api/1332782547565993984")
      .then(response => response.json())
      .then(productos => {
          productos.forEach((element: any) => {
          this.arrProductos.push(element as IProduct);
        });
      });

    console.log("Los datos son:" + this.arrProductos)
  }
  



  
  getAllProductos(): IProduct[]
  {
    return this.arrProductos;
  }

  deleteByName(name: string): IProduct[]{
    let i = this.arrProductos.findIndex(serie => serie.name == name);
    if (i != -1 && i >= 0 && i < this.arrProductos.length) {
      this.arrProductos.splice(i, 1);
    }

    return this.arrProductos;
}



//hacer el filter
getDataForm(filter: any) {
let mifiltro = "";
if ( filter.nombre != undefined) {
  filter += "nombre"
  this.arrProductos.filter(IProduct => IProduct.name == filter.name)
}
}









 private apiUrl = 'https://jsonblob.com/api/1331621654476021760'
private productos: IProduct[] = [];
 httpClient = inject(HttpClient);


//   constructor(private http: HttpClient) {}


// hacer fetch de los productos y rellenar el array interno
   fetchProductos(): Observable<IProduct[]> {
  return this.httpClient.get<IProduct[]>(this.apiUrl);
  }

//   // guardar productos en el array
//   private setProducto(productos: IProduct[]): void {
//     this.productos = productos;
//   }

//   getProductosWithObservables(): Observable<IProduct[]>{
//     return this.httpClient.get<IProduct[]>(this.apiUrl);
//   }

//     //promises
//     getAllWithPromises(): Promise<IProduct[]> {
//       return lastValueFrom(this.httpClient.get<IProduct[]>(this.apiUrl));
//     }

//   // Obtener productos del array
   getProducto(): IProduct[] {
   return this.arrProductos;
 }

//   getByName(id: string): Promise<IProduct>{
//     return lastValueFrom(this.httpClient.get<IProduct>(`${this.apiUrl}/${name}`));
//   }


  delete(id: string): Promise<IProduct> {
    return lastValueFrom(this.httpClient.delete<IProduct>(`${this.apiUrl}/${id}`));
}

  insert(producto: IProduct): Promise<IProduct>{
   return lastValueFrom(this.httpClient.put<IProduct>(this.apiUrl, producto));
 }

//   update(producto: IProduct): Promise<IProduct> {
//     return lastValueFrom(this.httpClient.put<IProduct>(`${this.apiUrl}/${producto._id}`, producto))
//   }
//   deleteById(id: string): Observable<void>{
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//     }
// } 

}