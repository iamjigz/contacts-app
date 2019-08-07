import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from './contact';
import { timeout, catchError } from 'rxjs/operators';

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

  // TODO: REMOVE THIS
  get dummyData$() {
    return this.http.get('http://dummy.restapiexample.com/api/v1/employees');
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get(`${this.base}/${id}`).pipe(
      timeout(1000),
      catchError(e => {
        const contact = this.contacts.find(i => i.id == id);
        return of(contact);
      })
    ) as Observable<Contact>;
  }

  add(contact: Contact) {
    this.contacts.push(contact);
    return this.http
      .post(this.base, contact)
      .subscribe(data => console.log('New contact added', data));
  }

  update(contact: Contact) {
    return this.http
      .patch(`${this.base}/${contact.id}`, contact)
      .subscribe(data =>
        console.log(`ID ${contact.id} has been updated`, contact)
      );
  }

  delete(id: string) {
    return this.http
      .delete(`${this.base}/${id}`)
      .subscribe(data => console.log(`ID ${id} has been deleted`, id));
  }
}
