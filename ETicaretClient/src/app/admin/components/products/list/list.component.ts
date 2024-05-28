import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list-product';
import { AlertifyService, MessageType, Position } from '../../../../services/common/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => "", errorMessage => this.alertify.message(errorMessage, {
      messageType: MessageType.Error,
      position: Position.TopRight,
      delay: 5,
      dismissOthers: true
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged() {
    await this.getProducts()
  }

  async ngOnInit() {
    await this.getProducts();
  }


}
