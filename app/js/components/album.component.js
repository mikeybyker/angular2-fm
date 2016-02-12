System.register(['angular2/core', 'angular2/router', './breadcrumbs.component', '../services/lastfm.service', '../pipes/duration-pipe', '../utils/error-message'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, breadcrumbs_component_1, lastfm_service_1, duration_pipe_1, error_message_1;
    var AlbumComponent;
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
            function (duration_pipe_1_1) {
                duration_pipe_1 = duration_pipe_1_1;
            },
            function (error_message_1_1) {
                error_message_1 = error_message_1_1;
            }],
        execute: function() {
            AlbumComponent = (function () {
                function AlbumComponent(lastFmService, _routeParams) {
                    this.lastFmService = lastFmService;
                    this._routeParams = _routeParams;
                    this.links = [];
                }
                AlbumComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.artistName = this._routeParams.get('name');
                    this.mbid = this._routeParams.get('mbid');
                    this.links.push({ title: decodeURI(this.artistName), url: "artist/" + this.artistName });
                    if (!this.artistName || !this.mbid) {
                        this.error = new error_message_1.ErrorMessage('Error', 'Did not find an album to look for...');
                        return;
                    }
                    this.error = null;
                    this.lastFmService
                        .getAlbumInfo(this.mbid, {})
                        .subscribe(function (data) {
                        if (data.error) {
                            _this.error = new error_message_1.ErrorMessage('Error', data.error);
                            return;
                        }
                        _this.album = data;
                        _this.links.push({ title: _this.album.name, url: '' });
                    }, function (error) {
                        _this.error = new error_message_1.ErrorMessage('Error', error);
                    });
                };
                AlbumComponent = __decorate([
                    core_1.Component({
                        selector: 'album',
                        bindings: [lastfm_service_1.LastFmService],
                        providers: [lastfm_service_1.LastFmService],
                        pipes: [duration_pipe_1.TrackDurationPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, breadcrumbs_component_1.BreadcrumbsComponent],
                        templateUrl: './app/views/album.component.html'
                    }), 
                    __metadata('design:paramtypes', [lastfm_service_1.LastFmService, router_1.RouteParams])
                ], AlbumComponent);
                return AlbumComponent;
            })();
            exports_1("AlbumComponent", AlbumComponent);
        }
    }
});
//# sourceMappingURL=album.component.js.map