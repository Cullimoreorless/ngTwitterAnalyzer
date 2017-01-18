import { Inject, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


//import { TwitterService }   from './twitter.service';
declare var d3: any;
@Component({
  selector: 'my-app',
  templateUrl:'/static/app/app.component.html?10'
})
export class AppComponent  { 
  username = ''; 
  errorMessage = "";
  statusMessage = "Enter a twitter username to begin";
  showAnalysis = false;
  tweetData = {};

  constructor(@Inject(Http) private _http: Http){}

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
    ths.showAnalysis = false;
    ths.statusMessage = "Retrieving analysis...";
    if(ths.isValidUsername()){
      //start loading gif
      ths._http.get('/api/twitter/'+ ths.username)
        .toPromise()
        .then((response) => {
          this.showAnalysis = true;
          this.tweetData = response.json();
          ths.refreshGraphics(this.tweetData);
          console.log(this.tweetData);
        })
        .catch((reason) => {
          console.log(reason);
          ths.errorMessage = reason;
        })
    }
  };



  refreshGraphics = function(data:Object){
      loadSentimentHoriz(JSON.parse(data.sentimentData));
      loadSentimentEmot(JSON.parse(data.posNegData));
      loadLineGraph('DOW', JSON.parse(data.dayOfWeek), 
        400, 350, 'dayOfWeek','percentage',
        'Day of Week', 'Percent of Tweets');
      loadLineGraph('HOD', JSON.parse(data.hourOfDay), 
        400, 350, 'hourOfDay','percentage',
        'Hour of Day', 'Percent of Tweets');
      loadWordCloud('my_canvas', data.wordCloudData);
  }
}
