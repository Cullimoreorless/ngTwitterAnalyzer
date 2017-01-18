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
var AppComponent = (function () {
    function AppComponent(_http) {
        this._http = _http;
        this.username = '';
        this.errorMessage = "";
        this.statusMessage = "Enter a twitter username to begin";
        this.showAnalysis = false;
        this.tweetData = {};
        this.refreshGraphics = function (data) {
            loadSentimentHoriz(JSON.parse(data.sentimentData));
            loadSentimentEmot(JSON.parse(data.posNegData));
            loadLineGraph('DOW', JSON.parse(data.dayOfWeek), 400, 350, 'dayOfWeek', 'percentage', 'Day of Week', 'Percent of Tweets');
            loadLineGraph('HOD', JSON.parse(data.hourOfDay), 400, 350, 'hourOfDay', 'percentage', 'Hour of Day', 'Percent of Tweets');
            loadWordCloud('my_canvas', data.wordCloudData);
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
                console.log(reason._body);
                ths.errorMessage = reason._body;
            });
        }
    };
    ;
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/static/app/app.component.html?10'
    }),
    __param(0, core_1.Inject(http_1.Http))
], AppComponent);
exports.AppComponent = AppComponent;
