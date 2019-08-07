import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {
  contacts: Contact[];
  show: boolean;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.show = false;
    this.http.contacts$.subscribe(data => {
      this.contacts = this.http.contacts = data;
    });
  }

  onFormSubmit(contact: Contact) {
    this.contacts.push(contact);
  }

  onDeleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.http.delete(id);
  }
}
