import { Component } from '@angular/core';
import {  Response } from '@angular/http';
import { Observable } from 'rxjs';

import { TwitterService }   from './twitter.service';

@Component({
  selector: 'my-app',
  templateUrl:'/static/app/app.component.html?1',
  providers:[TwitterService]
})
export class AppComponent  { 
  username = ''; 
  errorMessage = "";

  constructor( twitterService: TwitterService){}

  isValidUsername():boolean{
    let ths = this;
    if(!ths.username || ths.username == ''){
      ths.errorMessage = 'Must provide a username';
      return false;
    }
    else if(!ths.username.match(/[A-Za-z0-9_]/g)){
      ths.errorMessage = 'Username is not valid'
      return false;
    }
    return true;
  };

  getTwitterData():void{
    let resData = {};
    
    let ths = this;
    ths.errorMessage = "";
    if(ths.isValidUsername()){
      //start loading gif
      ths.twitterService.getTweets(ths.username)
        .then((response) => {
          resData = response.json();
          console.log(resData);
        })
        .catch((reason) => {
          console.log(reason);
          ths.errorMessage = reason;
        })
    }
  };
}
