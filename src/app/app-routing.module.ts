import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditComponent } from './contacts-edit/contacts-edit.component';

const routes: Routes = [
  { path: '', component: ContactsPageComponent },
  { path: 'user/:id', component: ContactsDetailComponent },
  { path: 'edit/:id', component: ContactsEditComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
