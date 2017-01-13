"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var twitter_service_1 = require("./twitter.service");
var AppComponent = (function () {
    function AppComponent(twitterService) {
        this.username = '';
        this.errorMessage = "";
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
        var resData = {};
        var ths = this;
        ths.errorMessage = "";
        if (ths.isValidUsername()) {
            //start loading gif
            ths.twitterService.getTweets(ths.username)
                .then(function (response) {
                resData = response.json();
                console.log(resData);
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
        templateUrl: '/static/app/app.component.html?1',
        providers: [twitter_service_1.TwitterService]
    })
], AppComponent);
exports.AppComponent = AppComponent;
