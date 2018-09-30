import {Component, OnInit, Pipe} from '@angular/core';
import { HttpService } from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ninja Gold';
  currentGold: number = 0;
  currentUser:any;
  userId: string;
  logs =  [];
  reversedLogs = [];
  constructor(private httpService: HttpService){
    this.httpService.getGold();
  }
  ngOnInit() {
    this.startGame(0);
  }

  startGame(num:Number):void{
    let observe = this.httpService.newGame({gold: num});
    observe.subscribe(data =>  {
      console.log('New Game Successfully Started: ', data);
      this.currentUser = data;
      if (this.currentUser.data) {
        this.userId = this.currentUser.data._id;
      }
    });
  }

  clickToFarm(userId: String, gold: Number): void {
    let randGold = Math.floor(Math.random() * 5) + 1;
    this.currentGold += randGold;

    this.logs.push('You earned '+ randGold + ' gold at the farm.');
    this.reversedLogs = this.logs.slice().reverse();

    console.log(this.logs);
    let observable = this.httpService.farm({data: userId, gold: this.currentGold});
    observable.subscribe(data =>{
      console.log('Farm success!', data);
    });
  }

  clickToCave(userId: String, gold: Number): void {
    let randGold = Math.floor(Math.random() * 10) + 5;
    this.currentGold += randGold;

    this.logs.push('You earned '+ randGold + ' gold at the cave.');
    this.reversedLogs = this.logs.slice().reverse();

    let observable = this.httpService.farm({data: userId, gold: this.currentGold});
    observable.subscribe(data =>{
      console.log('Cave success!', data);
    });
  }

  clickToHouse(userId: String, gold: Number): void {
    let randGold = Math.floor(Math.random() * 15) + 7;
    this.currentGold += randGold;

    this.logs.push('You earned '+ randGold + ' gold at the house.');
    this.reversedLogs = this.logs.slice().reverse();

    let observable = this.httpService.farm({data: userId, gold: this.currentGold});
    observable.subscribe(data =>{
      console.log('House success!', data);
    });
  }

  clickToCasino(userId: String, gold: Number): void {
    let randGold = Math.floor(Math.random()*100) + 1; // this will get a number between 1 and 99;
    randGold *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    this.currentGold += randGold;

    if (randGold > 0) {
      this.logs.push('It\'s your lucky day! You\'ve earned '+ randGold + ' gold at the casino.');
    }
    if (randGold < 0) {
      this.logs.push('Looks like your luck ran out! You\'ve lost '+ randGold + ' gold at the casino.');
    }

    this.reversedLogs = this.logs.slice().reverse();

    let observable = this.httpService.farm({data: userId, gold: this.currentGold});
    observable.subscribe(data => {
      // console.log('Casino success!', data);
      });
  }
}
