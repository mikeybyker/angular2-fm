import {Component, Input, OnInit, Output, EventEmitter}   from '@angular/core';
// import {NgSwitch, NgSwitchCase, NgSwitchDefault}          from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES,
        FormGroup, FormBuilder, Validators, FormControl}  from '@angular/forms';


@Component({
    selector: 'api-input',
    inputs: ['apiMethods'],
    // directives:[NgSwitch, NgSwitchCase, NgSwitchDefault, REACTIVE_FORM_DIRECTIVES],
    directives:[REACTIVE_FORM_DIRECTIVES],
    templateUrl: 'app/js/explore/api-input.component.html'
})

export class ApiInputComponent implements OnInit{

    mbidPattern = /^[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}$/;
    public apiMethods:any[] = [];
    selectedOption:any;
    fields:any = {};
    validMbid:boolean;// = false;

    apiForm: FormGroup;
    // subscription:any; // Subscriber;
    valid$:any; // Subscriber;
    invalid$:any; // Subscriber;
    field1:any; // FormControl is complaining, fuck knows why
    field2:any; // FormControl is complaining, fuck knows why

    configs = {
                field1: {placeholder:''},
                field2: {placeholder:''}
            };

    @Output() callService = new EventEmitter();

    constructor(private formBuilder: FormBuilder){}

// https://github.com/angular/angular/issues/5976

    ngOnInit(){


        this.apiForm = this.formBuilder.group({
            field1: ['', Validators.required],
            field2: ['']
        });

        this.field1 = this.apiForm.controls['field1'];
        this.field2 = this.apiForm.controls['field2'];

//@todo :  filter etc. if mbid not accepted...
// Maybe want to show when mbid not accepted...

        const subscription = this.field1.valueChanges
            // .startWith('')
            .debounceTime(500)
            .map(newValue => {
                console.log('VALIDATION');
                if(this.mbidPattern.test(newValue)){
                    return newValue;
                } else {
                    return '';
                }
            })
            .share(); // only validate once per value...

        this.valid$ = 
            subscription
            .filter(r => !!r) // only valid mbid passes...

        this.invalid$ =
            subscription
            .filter(r => !r); // only non-mbid passes...

        this.selectedOption = this.apiMethods['Album'].length? this.apiMethods['Album'][0] : null;
        this.initFields(this.selectedOption);
    }

    initFields(option){
        let id, p;

        if(!option || !option.params){
            return false;
        }
        for(let i=0, len=option.params.length;i<len;i++)
        {
            p =  option.params[i];
            id = p.id;
            this.configs[`field${i+1}`].placeholder = p.label || '';
            this.fields[`field${i+1}`] = p.default || '';            

            if(id === 'artistOrMbid')
            {
                // this.validMbid = this.mbidPattern.test(p.default); // shame :-|
                this.beginSubscribe();
            }
        }

    }

    keys() : Array<string> {
        return Object.keys(this.apiMethods);
    }

    callApi(){
        let params = this.getParamsArray(this.selectedOption, this.fields),
            o = {data: this.selectedOption, params: params};
            console.log('params', params);
        this.callService.emit({
            data: this.selectedOption,
            params: params
        });
    }

    beginSubscribe(){
        console.log('begin sub with : ', this.validMbid);

        // Is mbid...

        // To show is valid
        this.valid$
            .subscribe(newValue => {
                console.log('SUCCESS newValue :: ', newValue);
                this.validMbid = true;
            });

        // To update field2
        this.valid$
            .filter(() => this.selectedOption && this.selectedOption.params.length === 2)
            .subscribe(newValue => {
                console.log('SUCCESS there IS a validator - REMOVE IT');
                this.field2.clearValidators();
                this.field2.updateValueAndValidity(); // make it show!
                //console.log('this.field2 ::: ', !!this.field2.validator);
            });

        // Not mbid...

        // To show invalid
        this.invalid$
            .subscribe(newValue => {
                console.log('FAIL newValue :: ': newValue);
                this.validMbid = false;
              });
        // To add validators
        this.invalid$
            .filter(() => this.selectedOption && this.selectedOption.params.length === 2)
            .subscribe(newValue => {
                console.log('FAIL there IS *NOT* a validator - ADD IT');
                this.field2.setValidators([Validators.required]);
                this.field2.updateValueAndValidity(); // make it show!
              });

    }

    getParamsArray(data, fields){
        if(!data || !data.params){
            return [];
        }
        let params = [],
            len = data.params.length;
        for(let i=0;i<len;i++){
            params.push(fields[`field${i+1}`] || '');
        }
        return params;
    }
    selectChange(){
        this.fields = {};
        this.validMbid = false;
        this.initFields(this.selectedOption);
    }
}

/*
    beginSubscribeX(){
        // Yey! Works! Needs rewriting of course, but in theory...
        this.subscription
            .subscribe(newValue => {
                  // console.log(this.mbidPattern.test(newValue));
                  console.log('subscription : ', this.subscription);
                  console.log(this.field2);
                  if(this.mbidPattern.test(newValue)){
                      this.validMbid = true;
                      if(!!this.field2.validator){ // Only if there is a validator
                            this.field2.clearValidators();
                            this.field2.updateValueAndValidity(); // make it show!
                            //console.log('this.field2 ::: ', !!this.field2.validator);
                      }
                  } else {
                    this.validMbid = false;
                    if(!this.field2.validator){ // Only if there is not a validator
                        this.field2.setValidators([Validators.required]);
                        this.field2.updateValueAndValidity(); // make it show!
                        console.log('this.field2 ::: ', !!this.field2.validator);
                    }
                  }
              });
        // see: https://github.com/angular/angular/commit/638fd74
        // should be able to reset validators!
        //
        //var c = new FormControl(null, Validators.required);
         //
        
    }



        /*this.subscription
            .subscribe(newValue => {
                  console.log('newValue :: ': newValue);
                  // console.log(this.mbidPattern.test(newValue));
                  console.log('subscription : ', this.subscription);
                  console.log(this.field2);
                  if(this.mbidPattern.test(newValue)){
                      this.validMbid = true;
                      if(!!this.field2.validator){ // Only if there is a validator
                            this.field2.clearValidators();
                            this.field2.updateValueAndValidity(); // make it show!
                            //console.log('this.field2 ::: ', !!this.field2.validator);
                      }
                  } else {
                    this.validMbid = false;
                    if(!this.field2.validator){ // Only if there is not a validator
                        this.field2.setValidators([Validators.required]);
                        this.field2.updateValueAndValidity(); // make it show!
                        console.log('this.field2 ::: ', !!this.field2.validator);
                    }
                  }
              });*/
        // see: https://github.com/angular/angular/commit/638fd74
        // should be able to reset validators!
        /*
        var c = new FormControl(null, Validators.required);

        */