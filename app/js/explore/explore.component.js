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
var breadcrumbs_component_1 = require('../utils/breadcrumbs.component');
var lastfm_service_new_1 = require('../services/lastfm.service.new');
var api_input_component_1 = require('./api-input.component');
var methods_service_1 = require('./methods.service');
var ExploreComponent = (function () {
    function ExploreComponent(_lastFM, methodsService) {
        this._lastFM = _lastFM;
        this.methodsService = methodsService;
        this.links = [{ title: 'Explore', url: '' }];
        this.methods = [];
        this.output = '';
    }
    ExploreComponent.prototype.ngOnInit = function () {
        this.methods = this.methodsService.getMethods();
    };
    ExploreComponent.prototype.apiCall = function (o) {
        var _this = this;
        var data = o.data, params = o.params, fn, call;
        this.output = '';
        fn = data.fn.split('.');
        if (fn.length !== 2)
            return;
        /*
        Could do this with angular1 as well!
        
        
        */
        call = this._lastFM[fn[0]][fn[1]];
        console.log('/*call*/ : ', call);
        // fn.apply(this, params)
        // this._lastFM.Album.getInfo('91fa2331-d8b4-4d1f-aa4d-53b1c54853e5', '', {});
        //fn.apply(this, params)
        if (typeof call !== 'function')
            return;
        call.apply(this, params)
            .subscribe(function (data) {
            _this.output = data;
        }, function (error) {
            _this.output = error;
        });
    };
    ExploreComponent = __decorate([
        core_1.Component({
            selector: 'explore',
            providers: [methods_service_1.MethodsService],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, breadcrumbs_component_1.BreadcrumbsComponent, api_input_component_1.ApiInputComponent],
            templateUrl: 'app/js/explore/explore.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_new_1.LastFM, methods_service_1.MethodsService])
    ], ExploreComponent);
    return ExploreComponent;
}());
exports.ExploreComponent = ExploreComponent;
//# sourceMappingURL=explore.component.js.map