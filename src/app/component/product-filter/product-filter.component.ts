import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {

  filterForm: FormGroup;
  @Output() filtersChanged = new EventEmitter<any>();


constructor() {
this.filterForm = new FormGroup({
  nombre: new FormControl(''),        
  categoria: new FormControl(''),       
  precioMin: new FormControl(null, [Validators.min(0)]),
  precioMax: new FormControl(null, [Validators.min(0)]), 
  activo: new FormControl(false),       
});
}
applyFilter() {
  this.filtersChanged.emit(this.filterForm.value);
  
}

}
