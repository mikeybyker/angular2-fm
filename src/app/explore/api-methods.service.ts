import { Injectable }     from '@angular/core';
import { METHODS }        from './api-methods';

@Injectable()
export class ApiService {
    getApiMethods(){
        return METHODS;
    }
}
