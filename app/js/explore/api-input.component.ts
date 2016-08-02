import {Component, Input, OnInit} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
    selector: 'api-input',
    inputs: ['apiMethods', 'onCall'],
    directives:[NgSwitch, NgSwitchCase, NgSwitchDefault],
    templateUrl: 'app/js/explore/api-input.component.html'
})

export class ApiInputComponent implements OnInit{ 
    
    mbidPattern = /^[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}$/;
    public apiMethods:any[] = [];
    public onCall: Function;
    selectedOption:any;
    fields = {};
    // callApi = callApi;
    // change = change;
    // selectChange = selectChange;
    acceptsMbid:boolean = false;

    validMbid:boolean = false;

    ngOnInit(){
        this.selectedOption = this.apiMethods.length? this.apiMethods[0] : null;
        this.initFields(this.selectedOption);
    }

    callApi(){
        let params = this.getParamsArray(this.selectedOption, this.fields),
            o = {data: this.selectedOption, params: params};
            console.log('>>>call api');
        this.onCall && this.onCall(o);
    }

    change(value){
        console.log('CHANGE');
        this.validMbid = this.mbidPattern.test(value);
    }
    initFields(option){
        var id;
        this.acceptsMbid = false;
        if(!option || !option.params){
            return false;
        }
        for(var i=0, len=option.params.length;i<len;i++)
        {
            id = option.params[i].id;

            if(option.params[i].default){
                this.fields[id] = option.params[i].default;
            }
            if(id === 'artistOrMbid')
            {
                this.acceptsMbid = true;
                this.change(this.fields[id] || '');
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
        this.fields = {};
        this.validMbid = false;
        this.initFields(this.selectedOption);
    }
}