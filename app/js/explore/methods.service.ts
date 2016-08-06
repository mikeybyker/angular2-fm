import {Injectable}     from '@angular/core';
import {METHODS}        from './data-methods';

@Injectable()
export class MethodsService {
    getMethods(){
        return METHODS;
    }
}