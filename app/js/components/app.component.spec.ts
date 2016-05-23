import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from '@angular/core/testing';
import { AppComponent } from '../components/app.component';

beforeEachProviders(() => [AppComponent]);

describe('App: Angular2-FM', () => {
    it('should create the app',
        inject([AppComponent], (app: AppComponent) => {
            expect(app).toBeTruthy();
        }));

    it('should have as title \'Angular2-FM\'',
        inject([AppComponent], (app: AppComponent) => {
            expect(app.title).toEqual('Angular2-FM');
        }));
});
