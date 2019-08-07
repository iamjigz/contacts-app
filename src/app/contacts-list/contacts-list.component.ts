import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  @Input() contacts: Observable<Contact[]>;
  @Output() DeleteContact: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  delete(id: string) {
    this.DeleteContact.emit(id);
  }
}
