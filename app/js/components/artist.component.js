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
                        template: "\n        <breadcrumbs [links]=\"links\"></breadcrumbs>\n        <div class=\"row align-center\" *ngIf=\"error\">\n            <div class=\"medium-6 large-4 column\">\n                <div class=\"callout alert\">\n                    <h5>{{error.title}}</h5>\n                    <p>\n                        {{error.message}}\n                    </p>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\" *ngIf=\"artist\">\n            <div class=\"small-12 medium-6 columns\">\n                <img class=\"thumbnail main-artist\" [src]=\"artist.images.mega\">\n            </div>\n            <div class=\"small-12 medium-6 columns\">\n                <h3>{{artist?.name}}</h3>\n                <!-- ang2 version of bind-as-html... -->\n                <p [innerHTML]=\"artist?.bio?.summary | externalhref\"></p>\n                <dl *ngIf=\"artist\">\n                    <dt>Listeners</dt>\n                    <dd>{{artist.stats.listeners}}</dd>\n                    <dt>Play Count</dt>\n                    <dd>{{artist.stats.playcount}}</dd>\n                </dl>\n            </div>\n        </div>\n        <div *ngIf=\"artist\">\n            <div class=\"row\">\n                <div class=\"columns\">\n                    <h3>Popular Albums</h3>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"columns small-6 medium-4 large-2\" *ngFor=\"#album of albums\">\n                    <a *ngIf=\"album.images.extralarge\" [routerLink]=\"['/Album', {name: album.artist.name, mbid: album.mbid}]\"><img class=\"thumbnail\" [src]=\"album.images.extralarge\"></a>\n                </div>\n            </div>\n            <div *ngIf=\"artist.similar.length\">\n                <div class=\"row\">\n                    <div class=\"columns\">\n                        <h3>Similar Artists</h3>\n                    </div>\n                </div>\n                <div class=\"row align-spaced\">\n                    <div class=\"column small-5 medium-4\" *ngFor=\"#similar of artist.similar | limit:4\">\n                       <div class=\"artist\" >\n                            <a [routerLink]=\"['Artist', {name: similar.name}]\">\n                                <img class=\"thumbnail\" [src]=\"similar.images.large\">\n                            </a>\n                            <div class=\"artist-caption\">\n                                <div class=\"artist-name\">\n                                    <h4>{{ similar.name }}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        "
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