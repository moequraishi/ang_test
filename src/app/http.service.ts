import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  new(data) {
    return this.http.post('/new', data);
  }
  getAll() {
    return this.http.get('/products');
  }
  getSingle(id) {
    return this.http.get('/edit/' + id);
  }
  update(id, data) {
    return this.http.post('/edit/' + id, data);
  }
  delete(id) {
    return this.http.post('/remove/' + id, false);
  }
}
