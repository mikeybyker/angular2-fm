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
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent() {
        this.links = [];
    }
    BreadcrumbsComponent.prototype.ngOnInit = function () {
        this.links.unshift({ title: 'HOME', url: '' });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BreadcrumbsComponent.prototype, "links", void 0);
    BreadcrumbsComponent = __decorate([
        core_1.Component({
            selector: 'breadcrumbs',
            template: "\n        <div class=\"row\">\n            <div class=\"columns\">\n                <nav aria-label=\"You are here:\" role=\"navigation\">\n                    <ul class=\"breadcrumbs\">\n                        <!-- docs say no first variable... -->\n                        <li *ngFor=\"let link of links; let last = last; let index  = index \" [class.disabled]='last'>\n                            <span [ngSwitch]=\"last && index !== 0\">\n                                <span *ngSwitchWhen=\"true\">{{link.title}}</span>\n                                <a [href]=\"link.url\" *ngSwitchDefault >{{link.title}}</a>\n                            </span>\n                        </li>\n                    </ul>\n                </nav>\n            </div>  \n        </div>  \n        "
        }), 
        __metadata('design:paramtypes', [])
    ], BreadcrumbsComponent);
    return BreadcrumbsComponent;
}());
exports.BreadcrumbsComponent = BreadcrumbsComponent;
//# sourceMappingURL=breadcrumbs.component.js.map