import { Inject, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


//import { TwitterService }   from './twitter.service';

@Component({
  selector: 'my-app',
  templateUrl:'/static/app/app.component.html?3'
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

  loadSentimentEmot = function(gData : Object){
        var svg = d3.select('#sentimentGraphEmot').append('svg');
        let  w=400;
        let h=350
        let margin = {top:20, right: 20, bottom: 50, left: 50};
        let width = w - margin.left - margin.right;
        let height = h - margin.top - margin.bottom;
        svg.attr('width',w).attr('height',h)
        var xScale = d3.scaleLinear().rangeRound([0, width]),
            yScale = d3.scaleBand().rangeRound([height,0]).padding(0.1);
        
        var g = svg.append('g')
                .attr('transform','translate('+margin.left+','+margin.top+')')
        
        
        yScale.domain(gData.map(function(d){ return d['sentiment'];}))
        xScale.domain([0, d3.max(gData, function(d){ return d['percentage'] + 0.05; })])


        g.append('g')
            .attr('transform', 'translate(0,'+height+')')
            .call(d3.axisBottom(xScale).ticks(10, '%'));

        g.append('g')
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr('transform','rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Y Axis Maybe')

        g.selectAll('.bar')
            .data(gData)
            .enter().append('rect')
                .attr('class','bar')
                .attr('x', function(d){ return 0; })
                .attr('y', function(d){ return yScale(d['sentiment']); })
                .attr('height', yScale.bandwidth())
                .attr('width', function(d){ return  xScale(d['percentage']); })

    }
    loadSentimentHoriz = function(gData){
        var svg = d3.select('#sentimentGraphHoriz').append('svg');
        let w=400; 
        let h=350;
        let margin = {top:20, right: 20, bottom: 50, left: 50};
        let width = w - margin.left - margin.right;
        let height = h - margin.top - margin.bottom;
        svg.attr('width',w).attr('height',h)
        var xScale = d3.scaleLinear().rangeRound([0, width]),
            yScale = d3.scaleBand().rangeRound([height,0]).padding(0.1);
        
        var g = svg.append('g')
                .attr('transform','translate('+margin.left+','+margin.top+')')
        
        yScale.domain(gData.map(function(d){ return d['sentiment'];}))
        xScale.domain([0, d3.max(gData, function(d){ return d['percentage'] + 0.05; })])


        g.append('g')
            .attr('transform', 'translate(0,'+height+')')
            .call(d3.axisBottom(xScale).ticks(10, '%'));

        g.append('g')
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr('transform','rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Y Axis Maybe')

        g.selectAll('.bar')
            .data(gData)
            .enter().append('rect')
                .attr('class','bar')
                .attr('x', function(d){ return 0; })
                .attr('y', function(d){ return yScale(d['sentiment']); })
                .attr('height', yScale.bandwidth())
                .attr('width', function(d){ return  xScale(d['percentage']); })

    };


    refreshGraphics = function(data:Object){
        this.loadSentimentHoriz(JSON.parse(data.sentimentData));
        this.loadSentimentEmot(JSON.parse(data.posNegData));
        
        WordCloud(document.getElementById('my_canvas'), { list: data.wordCloudData } );
    }
}
