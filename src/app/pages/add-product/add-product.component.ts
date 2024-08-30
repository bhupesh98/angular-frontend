import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
	addProductForm: FormGroup;
	private readonly productService: ProductService = inject(ProductService);
	productCreated: boolean = false;

	constructor(private fb: FormBuilder) {
		this.addProductForm = this.fb.group({
			name: ['',[Validators.required]],
			description: ['',[Validators.required]],
			price: [0,[Validators.required]],
			skuCode: ['',[Validators.required]],
		});
	}

	onSubmit(): void {
		if (this.addProductForm.valid) {
			const product: Product = {
				name: this.addProductForm.get('name')?.value,
				description: this.addProductForm.get('description')?.value,
				price: this.addProductForm.get('price')?.value,
				skuCode: this.addProductForm.get('skuCode')?.value,
			};
			this.productService.createProduct(product).subscribe(() => {
				this.productCreated = true;
				this.addProductForm.reset();
			})
		} else {
			console.log('Form is invalid');
		}
	}

	get skuCode() {
		return this.addProductForm.get('skuCode');
	}

	get name() {
		return this.addProductForm.get('name');
	}

	get description() {
		return this.addProductForm.get('description');
	}

	get price() {
		return this.addProductForm.get('price');
	}
}
