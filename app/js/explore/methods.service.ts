import { Injectable } from '@angular/core';
import { METHODS } from './mock-methods';

@Injectable()
export class MethodsService {
    getMethods(){
        return METHODS;
    }
}