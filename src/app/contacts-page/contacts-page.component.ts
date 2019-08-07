import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Contact } from '../contact';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  contacts: Contact[];
  show: boolean;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.show = false;
    this.contacts$ = this.http.contacts$;
    this.contacts$.subscribe(data => {
      this.contacts = this.http.contacts = data;

      if (this.contacts.length === 0) {
        this.http.dummyData$.subscribe(dummy =>
          console.log(`CANT FETCH CONTACTS`, dummy)
        );
      }
    });
  }

  onFormSubmit(contact: Contact) {
    this.contacts.push(contact);
  }

  onDeleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.http.delete(id);
  }

  onUpdateContact(contact: Contact) {
    const index = this.contacts.findIndex(i => i.id === contact.id);
    this.contacts[index] = contact;
    this.http.update(contact);
  }
}
