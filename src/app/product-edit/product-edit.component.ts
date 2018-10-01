import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  userIdData: any = {};
  editData: any = {};
  userId: string;
  price: string;
  title: string;
  imageUrl: string;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.userIdData = params;
      this.userId = this.userIdData.params.id;
    });
    this.getProduct();
  }
  getProduct() {
    const observable = this.httpService.getSingle(this.userId);
    observable.subscribe(data => {
      console.log('Got single product', data);
      this.editData = data;
      this.title = this.editData.data.title;
      this.price = this.editData.data.price;
      this.imageUrl = this.editData.data.imageUrl;
    });
  }
  update() {
    const update = {
      title: this.title,
      price: this.price,
      imageUrl: this.imageUrl
    };
    const ob = this.httpService.update(this.userId, update);
    ob.subscribe(data => {
      console.log('Product updated', data);
    });

    this.router.navigate(['/products']);
  }
  delete() {
    const ob = this.httpService.delete(this.userId);
    ob.subscribe(data => {
      console.log('Product Deleted');
      this.router.navigate(['/products']);
    });
  }
}
