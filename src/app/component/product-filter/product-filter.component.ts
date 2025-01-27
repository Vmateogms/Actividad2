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
  name: new FormControl(''),
  category: new FormControl(''),
  minPrice: new FormControl(null, [Validators.min(0)]),
  maxPrice: new FormControl(null, [Validators.min(0)]),
  active: new FormControl(false),
});

}
applyFilter() {
  this.filtersChanged.emit(this.filterForm.value);
  
}

}
