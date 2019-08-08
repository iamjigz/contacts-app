import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    ContactsListComponent,
    ContactsFormComponent,
    PageNotFoundComponent,
    ContactsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
