import {Injectable}     from '@angular/core';
import {METHODS}        from './data-methods';

@Injectable()
export class ApiService {
    getApiMethods(){
        return METHODS;
    }
}