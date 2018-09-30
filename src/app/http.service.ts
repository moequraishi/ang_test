import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  newGame(num) {
    return this.http.post('/newgame', num);
  }

  getGold() {
    let tempObservable = this.http.get('/gold');
    tempObservable.subscribe(data => console.log('Got gold: ', data));
  }
  farm(data) {
    return this.http.post('/farm', data);
  }
}
