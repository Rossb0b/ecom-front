import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.sass']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  loading = false;

  filesToUpload = [];
  mimeTypes = ['data:image/jpeg', 'data:image/jpg', 'data:image/png'];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {
    this.buildForm();
   }

  /**
   *
   *
   * @memberof ProductCreateComponent
   */
  ngOnInit(): void { }

  /**
   *
   *
   * @memberof ProductCreateComponent
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      description: ['', {validators: [Validators.required, Validators.minLength(10)]}],
      price: [null, {validators: [Validators.required, Validators.min(1)]}],
    });
  }

  /**
   *
   *
   * @param {Event} event
   * @memberof ProductCreateComponent
   */
  onPickImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0] as any;
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result.toString();
      for (const mimeType of this.mimeTypes) {
        if (result.includes(mimeType)) {
          this.filesToUpload.push(result);
        }
      }
    };

    reader.readAsDataURL(file);
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof ProductCreateComponent
   */
  async createProduct(): Promise<void> {
    if(!this.form.valid) return

    this.loading = true;

    try {
      await this.productService.createProduct(this.form.value, this.filesToUpload);
    } catch (e) {
      throw Error(e);
    } finally {
      this.loading = false;
    }

    this.router.navigateByUrl('/admin');
  }

}
