import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'service-input',
  styleUrls: ['./service-input.component.css'],
  templateUrl: './service-input.component.html'
})

export class ServiceInputComponent implements OnInit {

  mbidPattern = /^[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}$/;
  selectedOption: any;
  fields: any = {};
  maxFields: number = 2;
  validMbid: boolean;  // = false;
  canBeMbid: boolean;  // = false;

  apiForm: FormGroup;
  valid$: Observable<string>;
  invalid$: Observable<string>;
  field1: FormControl; // Very tied to this use case
  field2: FormControl;

  @Input() serviceMethods: any[] = [];
  @Output() callService = new EventEmitter();
  @Output() changeMethod = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.apiForm = this.formBuilder.group({
      field1: ['', Validators.required],
      field2: ['']
    });

    this.field1 = <FormControl>this.apiForm.controls['field1'];
    this.field2 = <FormControl>this.apiForm.controls['field2'];

    const subscription: Observable<string> = this.field1.valueChanges
      .filter(() => {
        // Not too nice :-|
        this.canBeMbid = this.selectedOption
          && this.selectedOption.params.length
          && this.selectedOption.params[0].id === 'artistOrMbid';
        return this.canBeMbid;
      })
      .debounceTime(500)
      .map(newValue => {
        // Validate...
        return this.mbidPattern.test(newValue) ? newValue : '';
      })
      .share(); // only validate once per value...

    this.valid$ = subscription.filter(r => !!r);         // only valid mbid passes...
    this.invalid$ = subscription.filter(r => !r);        // only non-mbid passes...

    this.selectedOption = this.serviceMethods['Album'].length ? this.serviceMethods['Album'][0] : null;
    this.initFields(this.selectedOption);
    this.beginSubscribe();

  }

  initFields(option) {
    let id, p;
    if (!option || !option.params) {
      return false;
    }
    for (let i = 0, len = option.params.length; i < len; i++) {
      p = option.params[i];
      id = p.id;
      this.fields[i + 1] = p.default || '';
      // Always required : just update the validity
      if (i === 0) {
        this[`field${i + 1}`].updateValueAndValidity();
      }
      // For the rest of the fields
      if (i > 0) {
        this.updateRequired(this[`field${i + 1}`], p.required);
      }
    }
    // Reset required on hidden fields
    for (let i = option.params.length; i < this.maxFields; i++) {
      this.updateRequired(this[`field${i + 1}`], false);
    }

  }

  updateRequired(field, required: boolean = true) {
    if (required) {
      field.setValidators([Validators.required]);
    } else {
      field.clearValidators();
    }
    field.updateValueAndValidity();
  }

  callApi() {
    let params: Array<string> = this.getParamsArray(this.selectedOption, this.fields),
      o = { data: this.selectedOption, params: params };
    this.callService.emit({
      data: this.selectedOption,
      params: params
    });
  }

  beginSubscribe() {

    // Is mbid...

    // To show is valid
    this.valid$
      .subscribe(newValue => {
        this.validMbid = true;
      });

    // To remove validators
    this.valid$
      .filter(() => this.selectedOption && this.selectedOption.params.length === 2)
      .subscribe(newValue => {
        this.updateRequired(this.field2, false);
      });

    // Not mbid...

    // To show invalid
    this.invalid$
      .subscribe(newValue => {
        this.validMbid = false;
      });
    // To add validators
    this.invalid$
      .filter(() => this.selectedOption && this.selectedOption.params.length === 2)
      .subscribe(newValue => {
        this.updateRequired(this.field2, true);
      });

  }

  getParamsArray(data, fields): Array<string> {
    if (!data || !data.params) {
      return [];
    }
    let params: Array<string> = Object.keys(fields)
      .sort((a, b) => parseInt(a) - parseInt(b)) // make sure in correct order > parseInt just to shut typescript up
      .map(k => fields[k] || '');
    return params;
  }

  keys(): Array<string> {
    return Object.keys(this.serviceMethods);
  }

  selectChange() {
    this.fields = {};
    this.validMbid = false;
    this.initFields(this.selectedOption);
    this.changeMethod.emit({
      fn: this.selectedOption.fn,
      group: this.selectedOption.group
    });
  }
}
