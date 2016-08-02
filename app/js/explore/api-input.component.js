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
var common_1 = require('@angular/common');
var ApiInputComponent = (function () {
    function ApiInputComponent() {
        this.mbidPattern = /^[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}$/;
        this.apiMethods = [];
        this.fields = {};
        // callApi = callApi;
        // change = change;
        // selectChange = selectChange;
        this.acceptsMbid = false;
        this.validMbid = false;
    }
    ApiInputComponent.prototype.ngOnInit = function () {
        this.selectedOption = this.apiMethods.length ? this.apiMethods[0] : null;
        this.initFields(this.selectedOption);
    };
    ApiInputComponent.prototype.callApi = function () {
        var params = this.getParamsArray(this.selectedOption, this.fields), o = { data: this.selectedOption, params: params };
        console.log('>>>call api');
        this.onCall && this.onCall(o);
    };
    ApiInputComponent.prototype.change = function (value) {
        console.log('CHANGE');
        this.validMbid = this.mbidPattern.test(value);
    };
    ApiInputComponent.prototype.initFields = function (option) {
        var id;
        this.acceptsMbid = false;
        if (!option || !option.params) {
            return false;
        }
        for (var i = 0, len = option.params.length; i < len; i++) {
            id = option.params[i].id;
            if (option.params[i].default) {
                this.fields[id] = option.params[i].default;
            }
            if (id === 'artistOrMbid') {
                this.acceptsMbid = true;
                this.change(this.fields[id] || '');
            }
        }
        return false;
    };
    ApiInputComponent.prototype.getParamsArray = function (data, fields) {
        if (!data || !data.params) {
            return [];
        }
        var params = [], len = data.params.length;
        for (var i = 0; i < len; i++) {
            params.push(fields[data.params[i].id] || '');
        }
        return params;
    };
    ApiInputComponent.prototype.selectChange = function () {
        this.fields = {};
        this.validMbid = false;
        this.initFields(this.selectedOption);
    };
    ApiInputComponent = __decorate([
        core_1.Component({
            selector: 'api-input',
            inputs: ['apiMethods', 'onCall'],
            directives: [common_1.NgSwitch, common_1.NgSwitchCase, common_1.NgSwitchDefault],
            templateUrl: 'app/js/explore/api-input.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ApiInputComponent);
    return ApiInputComponent;
}());
exports.ApiInputComponent = ApiInputComponent;
//# sourceMappingURL=api-input.component.js.map