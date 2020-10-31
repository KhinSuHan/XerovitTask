import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { ValidateEmailNotTaken, ValidatePhoneNoNotTaken } from '../../services/async-validators';
import { ModalComponent } from '.././modal/modal.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

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
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.maxLength(50)], ValidateEmailNotTaken.createValidator(this.api)],
    phone: ['', [Validators.required, Validators.maxLength(50)], ValidatePhoneNoNotTaken.createValidator(this.api)]
  });

  ngOnInit() { }

  /**open confirmation modal dialog on clicking save button */
  openAddModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "add",
      title: "Are you sure you want to add this contact?",
      description: "Click 'Confirm' button to add new contact.",
      actionButtonText: "Confirm",
      contactValue: this.contactForm.value
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
