System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AboutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AboutComponent = (function () {
                function AboutComponent() {
                }
                AboutComponent = __decorate([
                    core_1.Component({
                        selector: 'about',
                        template: "\n        <div class=\"row\">\n            <div class=\"small-10 small-offset-1 columns\">\n                <h2>About</h2>\n                <p>\n                    A simple <a href=\"http://www.last.fm/\" target=\"_blank\">Last.fm</a> app to search/browse artists and albums. Made with <a href=\"https://angular.io/\" target=\"_blank\">Angular 2</a> (version 2.0.0-beta.1 - things may change).\n                    <br>\n                    <a href=\"http://foundation.zurb.com/sites\" target=\"_blank\">Foundation 6</a> used for (limited!) styling.\n                </p>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"small-12 medium-6 columns\">\n                        <h3>Features Used</h3>\n                        <ul class=\"list\">\n                            <li>Components</li>\n                            <li>Template Syntax</li>\n                            <li>Routing &amp; Navigation</li>\n                            <li>$http service - Reactive programming (RxJs)</li>\n                            <li>Forms / User Input</li>\n                            <li>Dependency Injection</li>\n                            <li>Pipes</li>\n                            <li>Attribute directives</li>\n                            <li>Structural directives</li>\n                        </ul>\n                    </div>\n                    <div class=\"small-12 medium-6 columns\">\n                        <h3>Install</h3>\n                        <code>npm install</code>\n                        <h3>Run</h3>\n                        <code>npm start</code>\n                    </div>\n                </div>\n                <hr>\n            </div>\n        </div>\n\n        "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AboutComponent);
                return AboutComponent;
            })();
            exports_1("AboutComponent", AboutComponent);
        }
    }
});
//# sourceMappingURL=about.component.js.map