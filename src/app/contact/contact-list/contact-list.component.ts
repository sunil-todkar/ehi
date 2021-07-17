import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contactsListData: any[] = [];
  modalRef: BsModalRef;
  p: number = 1;
  isLoading: boolean = false;
  total: number = 0;

  constructor(private ContactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContactData();
  }

  // load contacts data
  loadContactData() {
    this.isLoading = true;
    this.ContactService.showContacts().subscribe((response: any) => {
      // console.log('Contact Response Is - ', response);
      this.contactsListData = response;
      this.total = this.contactsListData.length;
      this.isLoading = false;
    });
  }

  addNewContact() {
    this.router.navigate(['/add-contact']);
  }

  onUpdateContact(id: number) {
    this.router.navigate(['/add-contact', id]);
  }

  onDeleteContact(id: number) {
    Swal.fire({
      title: 'Do you want to delete a contact?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ContactService.deleteContact(id).subscribe(
          (response: any) => {
            this.loadContactData();
            Swal.fire({
              title: 'Contact Deleted Successfully!',
              showCancelButton: true,
              confirmButtonText: `Ok`,
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error! Please try again later..',
              showCancelButton: true,
              confirmButtonText: `Ok`,
            });
          }
        );
      } else if (result.isDenied) {
      }
    });
  }
}
