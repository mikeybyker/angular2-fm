System.register(['angular2/core', 'angular2/router', 'angular2/http', '../services/lastfm.service', '../pipes/limit-pipe', '../pipes/results-pipe', '../utils/error-message'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, lastfm_service_1, limit_pipe_1, results_pipe_1, error_message_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (lastfm_service_1_1) {
                lastfm_service_1 = lastfm_service_1_1;
            },
            function (limit_pipe_1_1) {
                limit_pipe_1 = limit_pipe_1_1;
            },
            function (results_pipe_1_1) {
                results_pipe_1 = results_pipe_1_1;
            },
            function (error_message_1_1) {
                error_message_1 = error_message_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(lastFmService) {
                    this.lastFmService = lastFmService;
                    this.model = { artist: 'The Cure' };
                }
                HomeComponent.prototype.onSubmit = function () {
                    var _this = this;
                    console.log(this.model.artist);
                    this.error = null;
                    this.lastFmService
                        .searchArtists(this.model.artist, { limit: 5 })
                        .subscribe(function (data) {
                        if (data.error) {
                            _this.error = new error_message_1.ErrorMessage('Error', data.message);
                            return;
                        }
                        _this.potentials = data;
                        if (!_this.potentials.length) {
                            _this.error = new error_message_1.ErrorMessage('Error', 'Nothing found...');
                        }
                    }, function (error) {
                        _this.error = new error_message_1.ErrorMessage('Error', error);
                    });
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home',
                        bindings: [http_1.HTTP_BINDINGS, lastfm_service_1.LastFmService],
                        providers: [lastfm_service_1.LastFmService],
                        pipes: [results_pipe_1.ResultsPipe, limit_pipe_1.LimitPipe],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: './app/views/home.component.html'
                    }), 
                    __metadata('design:paramtypes', [lastfm_service_1.LastFmService])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map