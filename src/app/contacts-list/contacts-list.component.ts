import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  @Input() contacts: Contact[];
  @Output() DeleteContact: EventEmitter<any> = new EventEmitter<any>();
  @Output() UpdateContact: EventEmitter<any> = new EventEmitter<any>();

  helper: Contact[];
  isEditing: boolean;

  form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });

  constructor() {}

  ngOnInit() {
    this.isEditing = false;
    this.helper = this.contacts;
  }

  update(contact: Contact) {
    this.isEditing = true;
    contact.editable = !contact.editable;
    this.form.setValue({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  save(contact: Contact) {
    const index = this.helper.findIndex(i => i.id === contact.id);
    const updated = (this.helper[index] = {
      ...this.form.value,
      id: contact.id
    });

    this.isEditing = false;
    contact.editable = !contact.editable;
    this.UpdateContact.emit(updated);
  }

  cancel(contact: Contact) {
    this.isEditing = false;
    contact.editable = !contact.editable;
  }

  delete(id: string) {
    this.DeleteContact.emit(id);
  }
}
