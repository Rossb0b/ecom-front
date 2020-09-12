import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  loading = false;
  productId = this.route.snapshot.params.id;
  product;
  filesToKeep = [];
  filesToUpload = [];
  mimeTypes = ['data:image/jpeg', 'data:image/jpg', 'data:image/png'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
    this.buildForm();
   }

  /**
   *
   *
   * @memberof ProductEditComponent
   */
  async ngOnInit() {
    try {
      this.product = await this.productService.find(this.productId);
    } catch (e) {
      throw new Error(e);
    }

    this.form.get('name').setValue(this.product.name);
    this.form.get('description').setValue(this.product.description);
    this.form.get('price').setValue(this.product.price);
    this.filesToKeep = this.product.images;
  }

  /**
   *
   *
   * @memberof ProductEditComponent
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      description: ['', {validators: [Validators.required, Validators.minLength(10)]}],
      price: ['', {validators: [Validators.required, Validators.min(1)]}],
    });
  }

  /**
   *
   *
   * @param {Event} event
   * @memberof ProductEditComponent
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
   * @param {*} imageIndex
   * @memberof ProductEditComponent
   */
  deleteImageFromProduct(imageIndex) {
    this.filesToKeep.splice(imageIndex, 1);
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof ProductEditComponent
   */
  async editProduct(): Promise<void> {
    if(!this.form.valid) return

    this.loading = true;

    try {
      await this.productService.editProduct(this.product._id, this.form.value, this.filesToKeep, this.filesToUpload);
    } catch (e) {
      throw Error(e);
    } finally {
      this.loading = false;
    }

    this.router.navigateByUrl('/admin');
  }

}
