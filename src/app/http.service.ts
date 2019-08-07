import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private base = 'https://jsonplaceholder.typicode.com/users';
  contacts: Contact[];

  constructor(private http: HttpClient) {}

  get contacts$() {
    return this.http.get(this.base) as Observable<Contact[]>;
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get(`${this.base}/${id}`) as Observable<Contact>;
  }

  add(contact: Contact) {
    this.contacts.push(contact);
    return this.http
      .post(this.base, contact)
      .subscribe(
        data => console.log('New contact added', data),
        err => console.log('Error adding new contact', contact, err)
      );
  }

  update(contact: Contact) {
    return this.http
      .patch(`${this.base}/${contact.id}`, contact)
      .subscribe(
        data => console.log(`ID ${contact.id} has been updated`, contact),
        err => console.log('Error updating contact', contact, err)
      );
  }

  delete(id: string) {
    return this.http
      .delete(`${this.base}/${id}`)
      .subscribe(
        data => console.log(`ID ${id} has been deleted`, id),
        err => console.log('Error deleting contact', id, err)
      );
  }
}
