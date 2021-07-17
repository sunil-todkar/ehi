import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  modalRef: BsModalRef;
  idParam: string = '';
  isUpadte: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ContactService: ContactService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      Status: ['true', Validators.required],
    });

    this.idParam = this.actRouter.snapshot.params['id'];
    if (this.idParam) {
      this.isUpadte = true;
      this.updateForm();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    // display form values on success
    let contact = this.contactForm.value;
    this.createContact(contact);
  }

  // Create a contact method
  createContact(contact: any) {
    if (this.isUpadte) {
      this.ContactService.updateContact(this.idParam, contact).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Contact Updated Successfully!',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
          this.onBack();
        }
      ),
        (error: any) => {
          console.log('Error - ', error);
          Swal.fire({
            title: 'Error! Please try again later..',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
        };
    } else {
      this.ContactService.createContacts(contact).subscribe((response: any) => {
        Swal.fire({
          title: 'Contact Created Successfully!',
          showCancelButton: true,
          confirmButtonText: `Ok`,
        });
        this.onBack();
      }),
        (error: any) => {
          console.log('Error - ', error);
          Swal.fire({
            title: 'Error! Please try again later..',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
        };
    }
  }

  updateForm() {
    this.ContactService.getCotactDetails(this.idParam).subscribe(
      (response: any) => {
        this.contactForm.patchValue(response);
      }
    );
  }

  onBack() {
    this.router.navigate(['']);
  }
}
