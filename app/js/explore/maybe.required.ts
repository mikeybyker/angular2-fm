import {Control, NG_VALIDATORS, Validator} from '@angular/common';
import {Directive, Provider, forwardRef, Attribute} from '@angular/core';
import { AbstractControl, Validators} from '@angular/forms';

const EMAIL_VALIDATOR = new Provider(NG_VALIDATORS, { useExisting: forwardRef(() => EmailValidator), multi: true });

export interface ValidatorFn { (c: AbstractControl): {[key: string]: any}; }

@Directive({
    // selector: '[emailValidator][ngControl],[emailValidator][ngFormControl],[emailValidator][ngModel]',
    selector: '[xxx]',
    providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator {
    constructor(){}
    validate(c: Control): {[key: string]: any} {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test(c.value) ? null : {'emailValidation':'email is invalid.'};
    }
}
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