import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {
  @Output() FormSubmitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });

  constructor(private http: HttpService) {}

  ngOnInit() {}

  private _getMaxId(): string {
    const max = this.http.contacts.reduce((prev, current) =>
      prev.id > current.id ? prev : current
    );
    return max.id;
  }

  get controls() {
    return this.form.controls;
  }

  submit() {
    this.form.controls.id.setValue(this._getMaxId() + 1);
    this.FormSubmitted.emit(this.form.value);
  }
}
