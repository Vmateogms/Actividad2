import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { IProduct } from '../../interface/iproducto';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

arrProductos: IProduct[];
ProductForm!: FormGroup;
products: IProduct[] = [];


ProductoService = inject(ProductoService);
router = inject(Router)

constructor(){
  this.inicializarFormulario();
  this.arrProductos = [];
}


private inicializarFormulario(): void {
  this.ProductForm = new FormGroup ({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    category: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    image: new FormControl(null, [Validators.required]),
    active: new FormControl(true, [Validators.required]),
  });
}





onSubmit() {
  if (this.ProductForm.valid) {
    const product: IProduct = this.ProductForm.value as IProduct;
    
    this.ProductoService
      .agregarProducto(product) 
      .then(() => {
        alert('Producto agregado con éxito');
        this.router.navigate(['/productos']);
      })
      .catch((error) => {
        console.error('Error al agregar el producto', error);
        alert('Ha habido un error al agregar el producto');
      });

    this.ProductForm.reset();
    this.ProductForm.get('active')?.setValue(true);
  }
}

  checkControl(formControlName: string, validador: string): boolean | undefined{
    return this.ProductForm.get(formControlName)?.hasError(validador) && this.ProductForm.get(formControlName)?.touched;
  }

}

