import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../contact';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from '../http.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  contact: Contact;

  form: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.getContact().subscribe(data => {
      console.log(data);
      this.form.setValue({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone
      });
    });
  }

  getContact() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.http.getContact$(params.get('id')))
    );
  }

  getFromBackup() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.contacts.filter(contact => contact.id !== params.get('id'))
      )
    );
  }

  update() {
    this.form.patchValue(this.form.value);
    this.http.update(this.form.value);
  }

  goHome() {
    return this.router.navigate(['/']);
  }
}
