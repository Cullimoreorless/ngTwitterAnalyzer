"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
//import { TwitterService }   from './twitter.service';
var AppComponent = (function () {
    function AppComponent(_http) {
        this._http = _http;
        this.username = '';
        this.errorMessage = "";
        this.statusMessage = "Enter a twitter username to begin";
        this.showAnalysis = false;
        this.tweetData = {};
        this.loadSentimentEmot = function (gData) {
            var svg = d3.select('#sentimentGraphEmot').append('svg');
            var w = 400;
            var h = 350;
            var margin = { top: 20, right: 20, bottom: 50, left: 50 };
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;
            svg.attr('width', w).attr('height', h);
            var xScale = d3.scaleLinear().rangeRound([0, width]), yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1);
            var g = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            yScale.domain(gData.map(function (d) { return d['sentiment']; }));
            xScale.domain([0, d3.max(gData, function (d) { return d['percentage'] + 0.05; })]);
            g.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(xScale).ticks(10, '%'));
            g.append('g')
                .call(d3.axisLeft(yScale))
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Y Axis Maybe');
            g.selectAll('.bar')
                .data(gData)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', function (d) { return 0; })
                .attr('y', function (d) { return yScale(d['sentiment']); })
                .attr('height', yScale.bandwidth())
                .attr('width', function (d) { return xScale(d['percentage']); });
        };
        this.loadSentimentHoriz = function (gData) {
            var svg = d3.select('#sentimentGraphHoriz').append('svg');
            var w = 400;
            var h = 350;
            var margin = { top: 20, right: 20, bottom: 50, left: 50 };
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;
            svg.attr('width', w).attr('height', h);
            var xScale = d3.scaleLinear().rangeRound([0, width]), yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1);
            var g = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            yScale.domain(gData.map(function (d) { return d['sentiment']; }));
            xScale.domain([0, d3.max(gData, function (d) { return d['percentage'] + 0.05; })]);
            g.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(xScale).ticks(10, '%'));
            g.append('g')
                .call(d3.axisLeft(yScale))
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Y Axis Maybe');
            g.selectAll('.bar')
                .data(gData)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', function (d) { return 0; })
                .attr('y', function (d) { return yScale(d['sentiment']); })
                .attr('height', yScale.bandwidth())
                .attr('width', function (d) { return xScale(d['percentage']); });
        };
        this.refreshGraphics = function (data) {
            this.loadSentimentHoriz(JSON.parse(data.sentimentData));
            this.loadSentimentEmot(JSON.parse(data.posNegData));
            WordCloud(document.getElementById('my_canvas'), { list: data.wordCloudData });
        };
    }
    AppComponent.prototype.isValidUsername = function () {
        var ths = this;
        if (!ths.username || ths.username == '') {
            ths.errorMessage = 'Must provide a username';
            return false;
        }
        else if (!ths.username.match(/[A-Za-z0-9_]/g)) {
            ths.errorMessage = 'Username is not valid';
            return false;
        }
        return true;
    };
    ;
    AppComponent.prototype.getTwitterData = function () {
        var _this = this;
        var resData = {};
        var ths = this;
        ths.errorMessage = "";
        ths.showAnalysis = false;
        ths.statusMessage = "Retrieving analysis...";
        if (ths.isValidUsername()) {
            //start loading gif
            ths._http.get('/api/twitter/' + ths.username)
                .toPromise()
                .then(function (response) {
                _this.showAnalysis = true;
                _this.tweetData = response.json();
                ths.refreshGraphics(_this.tweetData);
                console.log(_this.tweetData);
            })["catch"](function (reason) {
                console.log(reason);
                ths.errorMessage = reason;
            });
        }
    };
    ;
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/static/app/app.component.html?3'
    }),
    __param(0, core_1.Inject(http_1.Http))
], AppComponent);
exports.AppComponent = AppComponent;
