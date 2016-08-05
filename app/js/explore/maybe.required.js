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
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var EMAIL_VALIDATOR = new core_1.Provider(common_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return EmailValidator; }), multi: true });
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.prototype.validate = function (c) {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test(c.value) ? null : { 'emailValidation': 'email is invalid.' };
    };
    EmailValidator = __decorate([
        core_1.Directive({
            // selector: '[emailValidator][ngControl],[emailValidator][ngFormControl],[emailValidator][ngModel]',
            selector: '[xxx]',
            providers: [EMAIL_VALIDATOR]
        }), 
        __metadata('design:paramtypes', [])
    ], EmailValidator);
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
// export class EmailValidator implements Validator {
//     private _validator: ValidatorFn;
//   constructor(@Attribute("emailvalidator") maxLength: string) {
//       console.log('aaaaaaaaaaaaaa');
//     // this._validator = Validators.maxLength(parseInt(maxLength, 10));
//     this._validator = function(){
//         return false;
//     }
//   }
//   validate(c: Control): {[key: string]: any} {console.log('aaa'); return this._validator(c); }
// } 
//# sourceMappingURL=maybe.required.js.map