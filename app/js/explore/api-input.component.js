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
var forms_1 = require('@angular/forms');
var ApiInputComponent = (function () {
    function ApiInputComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.mbidPattern = /^[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}$/;
        this.apiMethods = [];
        this.fields = {};
        this.callService = new core_1.EventEmitter();
    }
    ApiInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiForm = this.formBuilder.group({
            field1: ['', forms_1.Validators.required],
            field2: ['']
        });
        this.field1 = this.apiForm.controls['field1'];
        this.field2 = this.apiForm.controls['field2'];
        var subscription = this.field1.valueChanges
            .filter(function () {
            // Not good, sorry :-|
            _this.canBeMbid = _this.selectedOption && _this.selectedOption.params[0].id === 'artistOrMbid';
            return _this.canBeMbid;
        })
            .debounceTime(500)
            .map(function (newValue) {
            // console.log('!Validation...', newValue);
            return _this.mbidPattern.test(newValue) ? newValue : '';
        })
            .share(); // only validate once per value...
        this.valid$ = subscription.filter(function (r) { return !!r; }); // only valid mbid passes...
        this.invalid$ = subscription.filter(function (r) { return !r; }); // only non-mbid passes...
        this.selectedOption = this.apiMethods['Album'].length ? this.apiMethods['Album'][0] : null;
        this.initFields(this.selectedOption);
        this.beginSubscribe();
    };
    ApiInputComponent.prototype.initFields = function (option) {
        var id, p;
        if (!option || !option.params) {
            return false;
        }
        for (var i = 0, len = option.params.length; i < len; i++) {
            p = option.params[i];
            id = p.id;
            this.fields[("field" + (i + 1))] = p.default || '';
            if (i > 0) {
                this.updateRequired(this[("field" + (i + 1))], p.required);
            }
        }
    };
    ApiInputComponent.prototype.updateRequired = function (field, required) {
        if (required === void 0) { required = true; }
        if (required) {
            field.setValidators([forms_1.Validators.required]);
        }
        else {
            field.clearValidators();
        }
        field.updateValueAndValidity();
    };
    ApiInputComponent.prototype.callApi = function () {
        var params = this.getParamsArray(this.selectedOption, this.fields), o = { data: this.selectedOption, params: params };
        this.callService.emit({
            data: this.selectedOption,
            params: params
        });
    };
    ApiInputComponent.prototype.beginSubscribe = function () {
        // Is mbid...
        var _this = this;
        // To show is valid
        this.valid$
            .subscribe(function (newValue) {
            console.log('SUCCESS newValue :: ', newValue);
            _this.validMbid = true;
        });
        // To update field2
        this.valid$
            .filter(function () { return _this.selectedOption && _this.selectedOption.params.length === 2; })
            .subscribe(function (newValue) {
            console.log('SUCCESS there IS a validator - REMOVE IT', newValue);
            console.log('this.valid$ ', _this.valid$);
            _this.updateRequired(_this.field2, false);
        });
        // Not mbid...
        // To show invalid
        this.invalid$
            .subscribe(function (newValue) {
            console.log('FAIL newValue :: ', newValue);
            _this.validMbid = false;
        });
        // To add validators
        this.invalid$
            .filter(function () { return _this.selectedOption && _this.selectedOption.params.length === 2; })
            .subscribe(function (newValue) {
            console.log('FAIL there IS *NOT* a validator - ADD IT');
            _this.updateRequired(_this.field2, true);
        });
    };
    ApiInputComponent.prototype.getParamsArray = function (data, fields) {
        if (!data || !data.params) {
            return [];
        }
        var params = [], len = data.params.length;
        for (var i = 0; i < len; i++) {
            params.push(fields[("field" + (i + 1))] || '');
        }
        return params;
    };
    ApiInputComponent.prototype.keys = function () {
        return Object.keys(this.apiMethods);
    };
    ApiInputComponent.prototype.selectChange = function () {
        this.fields = {};
        this.validMbid = false;
        this.initFields(this.selectedOption);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ApiInputComponent.prototype, "callService", void 0);
    ApiInputComponent = __decorate([
        core_1.Component({
            selector: 'api-input',
            inputs: ['apiMethods'],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
            templateUrl: 'app/js/explore/api-input.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ApiInputComponent);
    return ApiInputComponent;
}());
exports.ApiInputComponent = ApiInputComponent;
//# sourceMappingURL=api-input.component.js.map