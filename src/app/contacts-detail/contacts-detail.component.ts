import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Observable, of } from 'rxjs';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact$: Observable<Contact>;
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.contact$ = this.getContact();
    this.contact$.subscribe(data => (this.contact = data));
  }

  getContact() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.http.getContact(params.get('id'));
      })
    );
  }

  goHome() {
    return this.router.navigate(['/']);
  }
}
