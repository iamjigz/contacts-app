import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public setHttpHeader(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', `text/json`)
      .append(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      )
      .append('Cache-control', 'no-cache')
      .append('Cache-control', 'no-store')
      .append('Access-Control-Allow-Origin', '*')
      .append(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
      );
  }

  get contacts$() {
    return this.http.get(this.base, {
      headers: this.setHttpHeader()
    }) as Observable<Contact[]>;
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
