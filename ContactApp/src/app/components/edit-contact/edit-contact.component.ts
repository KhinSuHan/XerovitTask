import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../modal/modal.component';
import { ValidateEmailNotTaken, ValidatePhoneNoNotTaken } from '../../services/async-validators';
import { Contact } from './../../contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: Contact;

  /**form control value of name */
  get name() {
    return this.contactForm.get('name')
  }

  /**form control value of email */
  get email() {
    return this.contactForm.get('email')
  }

  /**form control value of phone */
  get phone() {
    return this.contactForm.get('phone')
  }
  constructor(
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.maxLength(50)]]
  });


  ngOnInit() {
    this.getSpecificContact();
  }

  /**
   * get detail information of specific contact
   */
  getSpecificContact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.api.getSpecificContact(id)
      .subscribe(contact => {
        this.contact = contact
        this.contactForm.setValue({
          name: this.contact.name,
          email: this.contact.email,
          phone: this.contact.phone
        });
      });
  }

  /**
   * open confirmation modal dialog on clicking save button
   * @param contactId: contact's unique id number
   */
  openEditModal(contactId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "edit",
      title: "Are you sure you want to update this contact?",
      description: "Click 'Confirm' button to update the contact.",
      actionButtonText: "Confirm",
      contactId: contactId,
      contactValue: this.contactForm.value
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
