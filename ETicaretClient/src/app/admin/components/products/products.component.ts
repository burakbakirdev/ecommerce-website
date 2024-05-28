import { Component, ViewChild, viewChild } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Create_Product } from '../../../contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {

    // this.httpClientService.get<Product[]>({
    //   controller: "products"
    // }).subscribe();

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "Molped",
    //   stock: 1000,
    //   price: 30
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products",
    // }, {
    //   id: "4e692c63-5f72-43c6-a1c5-c5436c3fc627",
    //   name: "renkli kitap",
    //   stock: "13330",
    //   price: "55"
    // }).subscribe();

    // this.httpClientService.delete({ controller: "products" }, "a43b0dfb-5708-4cfd-a6d1-cb678c2e7c53").subscribe();

  }

  @ViewChild(ListComponent) listComponent: ListComponent;

  createdProduct(createdProduct: Create_Product) {
    this.listComponent.getProducts();
  }

}
