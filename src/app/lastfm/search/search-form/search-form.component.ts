import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

interface ArtistSearch {
  artist: string
}
/*
todo:
#searchForm.$dirty && 

*/
@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  model: ArtistSearch = { artist: '' };

  @Input()
  initial: string = '';

  @Input()
  limit: number = 6;

  @Output()
  search = new EventEmitter();

  constructor() {
    // this.model.artist = this.initial;
  }

  ngOnInit(): void {
    this.model.artist = this.initial;
  }

  onSubmit() {
    this.search.emit({
      artist: this.model.artist,
      limit: this.limit
    });
  }

}
