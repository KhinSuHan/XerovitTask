import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { ModalActionsService } from '../../services/modal-actions.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  contacts;
  contactsWithAlphabets = [];
  searchTerm: string;
  deleteOperationSuccessfulSubscription: Subscription;

  constructor(
    private api: ApiService,
    private modalActionService: ModalActionsService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.getAllContactsByAlphabeticalOrder();
    this.deleteOperationSuccessfulSubscription = this.modalActionService.deleteOperationSuccessfulEvent$
      .subscribe(isSuccessful => {
        if (isSuccessful === true) {
          this.getAllContactsByAlphabeticalOrder();
        }
      });
  }

  /**
   * get all available contacts with respective alphabet and order
   */
  getAllContactsByAlphabeticalOrder() {
    this.api.getAllContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.sortContactsAlphabetically(this.contacts);
    },
      error => window.alert(error)
    )
  }

  /**
   * sort non-order list to alphabetically order list
   * @param contacts : list of all contacts
   */
  sortContactsAlphabetically(contacts) {
    let firstLetter = "";
    let contactsWithAlphabets = []
    if (contacts.length > 0) {
      contacts.sort((firstContact, secondContact) => firstContact.name.toUpperCase() > secondContact.name.toUpperCase() ? 1 : -1);
      for (let index in contacts) {
        let currentLetter = contacts[index].name[0].toUpperCase()
        if (currentLetter != firstLetter) {
          firstLetter = "" + currentLetter
          contactsWithAlphabets.push({ indexLetter: firstLetter })
        }
        contactsWithAlphabets.push(contacts[index]);
      }
    }
    this.contactsWithAlphabets = contactsWithAlphabets;
  }

  /**
   * open confirmation modal dialog on clicking delete button
   * @param contactId : contact's unique id number
   */
  openDeleteModal(contactId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "delete",
      title: "Are you sure you want to delete this contact?",
      description: "Deleted contact cannot be restored.",
      actionButtonText: "Confirm",
      contactId: contactId
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


}
