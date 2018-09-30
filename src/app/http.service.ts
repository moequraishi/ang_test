import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post('/new', data);
  }

  get() {
    return this.http.get('/notes');
  }

  // In case of false data only
  delete(id) {
    return this.http.post('/remove/' + id, false);
  }
}
