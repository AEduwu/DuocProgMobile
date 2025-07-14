import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
  standalone: false,
})
export class AddProductPage {

  newProduct = {
    name: '',
    price: null,
    location: '',
    description: '',
    address: '',
  };

  selectedImageFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  constructor() {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    console.log('Product data:', this.newProduct);
    console.log('Selected image file:', this.selectedImageFile);
  }
}