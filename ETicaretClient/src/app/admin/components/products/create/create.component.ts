import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { AlertifyService, MessageType, Position } from '../../../../services/common/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter()
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Please select and drag files...",
    accept: ".jpeg, .png"

  };

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value; 
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.alertify.message("Product added successfully.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        delay: 3,
        position: Position.TopRight
      })
      this.createdProduct.emit(create_product)
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        position: Position.TopRight,
        delay: 3,
        messageType: MessageType.Warning
      })
    })
  }

  selectAllText(event: any) {
    if (event.target.value == 0)
      event.target.select();
  }

}
