System.register(['angular2/core', 'angular2/router', './breadcrumbs.component', '../services/lastfm.service', '../pipes/results-pipe', '../pipes/limit-pipe', '../pipes/external-href-pipe', '../utils/error-message'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, breadcrumbs_component_1, lastfm_service_1, results_pipe_1, limit_pipe_1, external_href_pipe_1, error_message_1;
    var ArtistComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (breadcrumbs_component_1_1) {
                breadcrumbs_component_1 = breadcrumbs_component_1_1;
            },
            function (lastfm_service_1_1) {
                lastfm_service_1 = lastfm_service_1_1;
            },
            function (results_pipe_1_1) {
                results_pipe_1 = results_pipe_1_1;
            },
            function (limit_pipe_1_1) {
                limit_pipe_1 = limit_pipe_1_1;
            },
            function (external_href_pipe_1_1) {
                external_href_pipe_1 = external_href_pipe_1_1;
            },
            function (error_message_1_1) {
                error_message_1 = error_message_1_1;
            }],
        execute: function() {
            ArtistComponent = (function () {
                function ArtistComponent(lastFmService, _routeParams) {
                    this.lastFmService = lastFmService;
                    this._routeParams = _routeParams;
                    this.albums = [];
                    this.links = [];
                }
                ArtistComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.artistName = decodeURI(this._routeParams.get('name')); // necc?
                    if (!this.artistName) {
                        this.error = new error_message_1.ErrorMessage('Error', 'Artist not specified');
                        return;
                    }
                    this.error = null;
                    this.links.push({ title: this.artistName, url: "artist/" + this.artistName });
                    this.lastFmService.getAllArtist(this.artistName, {}, { limit: 6 })
                        .subscribe(function (res) {
                        console.log('getAllArtist > result ::: ', res);
                        if (res[0].error || res[1].error) {
                            var err = res[0] || res[1];
                            _this.error = new error_message_1.ErrorMessage('Error', err.message);
                            return;
                        }
                        _this.artist = res[0];
                        _this.albums = res[1];
                    }, function (error) {
                        var err = error.json ? error.json() : error;
                        _this.error = new error_message_1.ErrorMessage('Error', err.message);
                    });
                };
                ArtistComponent = __decorate([
                    core_1.Component({
                        selector: 'artist',
                        bindings: [lastfm_service_1.LastFmService],
                        providers: [lastfm_service_1.LastFmService],
                        pipes: [results_pipe_1.ResultsPipe, limit_pipe_1.LimitPipe, external_href_pipe_1.ExternalHrefPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, breadcrumbs_component_1.BreadcrumbsComponent],
                        // styles: [`
                        //   .foo {
                        //     background-image: {{artist.images.extralarge}}; // this would be nice!
                        //   }`],
                        templateUrl: './app/views/artist.component.html'
                    }), 
                    __metadata('design:paramtypes', [lastfm_service_1.LastFmService, router_1.RouteParams])
                ], ArtistComponent);
                return ArtistComponent;
            })();
            exports_1("ArtistComponent", ArtistComponent);
        }
    }
});
//# sourceMappingURL=artist.component.js.map