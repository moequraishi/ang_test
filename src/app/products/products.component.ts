import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productData: any = {};
  userId:string;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const observable = this.httpService.getAll();
    observable.subscribe(data => {
      console.log('Got the data', data);
      this.productData = data;
      this.userId = this.productData.data._id;
    });
  }

  delete(id) {
    const obvservable = this.httpService.delete(id);
    obvservable.subscribe(data => {
      console.log('Item deleted:', data);
      this.getData();
    });
  }

}
