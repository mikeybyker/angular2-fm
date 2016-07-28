"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var lastfm_service_1 = require('../services/lastfm.service');
var limit_pipe_1 = require('../pipes/limit-pipe');
var results_pipe_1 = require('../pipes/results-pipe');
var error_message_1 = require('../utils/error-message');
var HomeComponent = (function () {
    function HomeComponent(lastFmService) {
        this.lastFmService = lastFmService;
        this.model = { artist: 'The Cure' };
        this.maxResults = 5;
    }
    HomeComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.model.artist);
        // Using async pipe...
        this.potentials = this.lastFmService
            .searchArtistsAsync(this.model.artist, { limit: this.maxResults })
            .share(); // so we don't get 2 network requests with the subscription for error handling (below...)
        this.error = null;
        this.potentials
            .subscribe(function (data) {
            if (!data.length) {
                _this.error = new error_message_1.ErrorMessage('Error', 'Nothing found...');
                return;
            }
        }, function (error) {
            _this.error = new error_message_1.ErrorMessage('Error', error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            providers: [lastfm_service_1.LastFmService],
            pipes: [results_pipe_1.ResultsPipe, limit_pipe_1.LimitPipe],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            templateUrl: './app/views/home.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_1.LastFmService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
/*
When *not* using the angular async pipe...
onSubmit() {
    console.log(this.model.artist);
    this.error = null;
    this.lastFmService
        .searchArtists(this.model.artist, { limit: this.maxResults })
        .subscribe(data => {
            if (data.error || !data.length) {
                this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                this.potentials = [];
                return;
            }
            this.potentials = data;
        },
        error => {
            this.error = new ErrorMessage('Error', <any>error);
        });
}
*/ 
//# sourceMappingURL=home.component.js.map