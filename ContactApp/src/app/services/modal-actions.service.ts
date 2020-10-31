import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  private _deleteOperationSuccessfulEvent$: Subject<boolean> = new Subject();

  get deleteOperationSuccessfulEvent$(): Observable<boolean> {
    return this._deleteOperationSuccessfulEvent$.asObservable();
  }

  /**
   * perform modal action for respective modalData name
   * @param modalData : modal dialog data
   */
  modalAction(modalData: any) {
    switch (modalData.name) {
      case "delete":
        this.deleteContact(modalData);
        break;

      case "edit":
        this.editContact(modalData);
        break;

      case "add":
        this.addContact(modalData);
        break;

      default:
        break;
    }
  }

  /**
   * delete existing contact
   * @param modalData : modal dialog data
   */
  private deleteContact(modalData: any) {
    this.api.deleteContact(modalData.contactId).subscribe(
      response => {
        console.log('Success!', response);
        this._deleteOperationSuccessfulEvent$.next(true)
      },
      error => window.alert(error),
    );
  }

  /**
   * edit existing contact
   * @param modalData : modal dialog data
   */
  private editContact(modalData: any) {
    this.api.editContact(modalData.contactId, modalData.contactValue).subscribe(
      response => console.log('Success!', response),
      error => window.alert(error),
      () => this.router.navigate(['mainPage'])
    );
  }

  /**
   * add new contact
   * @param modalData : modal dialog data
   */
  private addContact(modalData: any) {
    this.api.createContact(modalData.contactValue).subscribe(
      response => console.log('Success!', response),
      error => window.alert(error.message),
      () => this.router.navigate(['mainPage'])
    );
  }
}
