import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
    selector: 'api-input',
    inputs: ['apiMethods'],
    directives:[NgSwitch, NgSwitchCase, NgSwitchDefault],
    templateUrl: 'app/js/explore/api-input.component.html'
})

export class ApiInputComponent implements OnInit{

    mbidPattern = /^[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}$/;
    public apiMethods:any[] = [];
    selectedOption:any;
    fields = {};
    // callApi = callApi;
    // change = change;
    // selectChange = selectChange;
    acceptsMbid:boolean = false;

    validMbid:boolean = false;

    @Output() doCall = new EventEmitter();

    ngOnInit(){
        this.selectedOption = this.apiMethods.length? this.apiMethods[0] : null;
        this.initFields(this.selectedOption);
    }

    callApi(){
        let params = this.getParamsArray(this.selectedOption, this.fields),
            o = {data: this.selectedOption, params: params};
            console.log('>>>call api');
        // this.onCall && this.onCall(o);
        this.doCall.emit({
          data: this.selectedOption,
          params: params
        });
    }

// change is only blur...keypress is only keypress - how about any change?!
// keyup works...
    inputChange(field){
        console.log('CHANGE', field, field.value);
        this.validMbid = this.mbidPattern.test(field);
        console.log('this.validMbid', this.validMbid);
    }

    /*
look at using a model...

    */
    initFields(option){
        console.log('CHANGE FIELDS', option);
        console.log('CHANGE selectedOption', this.selectedOption);
        var id;
        this.acceptsMbid = false;
        if(!option || !option.params){
            return false;
        }
        // var copy = Object.assign({}, myObject)
        for(var i=0, len=option.params.length;i<len;i++)
        {
            id = option.params[i].id;

            if(option.params[i].default){
                this.fields[id] = option.params[i].default;
            }
            if(id === 'artistOrMbid')
            {
                this.acceptsMbid = true;
                this.inputChange(this.fields[id] || '');
            }
        }
        return false;
    }
    getParamsArray(data, fields){
        if(!data || !data.params){
            return [];
        }
        let params = [],
            len = data.params.length;
        for(let i=0;i<len;i++){
            params.push(fields[data.params[i].id] || '');
        }
        return params;
    }
    selectChange(){
        console.log('selectChange');
        this.fields = {};
        this.validMbid = false;
        this.initFields(this.selectedOption);
    }
}