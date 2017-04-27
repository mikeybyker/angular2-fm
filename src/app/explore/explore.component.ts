import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LastFM } from '../lastfm/lastfm.service';
import { ApiService } from './api-methods.service';

@Component({
  selector: 'explore',
  styleUrls: ['./explore.component.css'],
  templateUrl: './explore.component.html'
})

export class ExploreComponent implements OnInit {

  links: Array<any> = [{ title: 'Explore', url: '' }];
  methods: any[] = [];
  output: string;

  constructor(private _lastFM: LastFM, private apiService: ApiService) {

  }

  ngOnInit() {
    const key = this._lastFM.getApiKey();
    if (!key || key === 'YOUR_API_KEY') {
      alert(`Please add your Last.fm api key (for the demo, look in index.html)\n...it won't work without one!`);
      throw new Error('Need an API Key!');
    }
    this.methods = this.apiService.getApiMethods();
    this.clearView();
  }

  apiCall(o) {

    let data = o.data,
      params = o.params,
      fn = data.fn || '',
      group = data.group || '',
      call;
    this.output = '[Loading...]';
    call = group ? this._lastFM[group][fn] : this._lastFM[fn];
    // console.log('/*call*/ : ', call);
    if (typeof call !== 'function') return;

    call.apply(this, params)
      .catch((error) => {
        return Observable.of({ error: error.message });
      })
      .subscribe(data => {
        this.output = data;
      },
      error => {
        this.output = <string>error;
      },
      () => {
        console.log('Completed:', [...data.group, '.', ...data.fn]);
      });
  }

  clearView() {
    this.output = '[Waiting...]';
  }

}
