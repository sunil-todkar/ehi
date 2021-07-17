import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'add-contact/:id', component: AddContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
