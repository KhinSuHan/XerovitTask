import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiRoot = environment.apiURL;

  constructor(private http: HttpClient) { }

  /**
   * check if user input email has already existed
   * @param email : value of user input email
   */
  checkEmailNotTaken(email: string) {
    return timer(500)
      .pipe(
        switchMap(() => {
          return this.http.get<any>(this.apiRoot.concat(`contacts?email=${email}`))
        })
      );
  }

  /**
   * check if user input phone number has already existed
   * @param phone : value of user input phone number
   */
  checkPhoneNoNotTaken(phone: string) {
    return timer(500)
      .pipe(
        switchMap(() => {
          return this.http.get<any>(this.apiRoot.concat(`contacts?phone=${phone}`))
        })
      );
  }

  /**
   * get all available contacts
   */
  getAllContacts(): Observable<any> {
    return this.http.get<Contact[]>(this.apiRoot.concat('contacts/'))
  }

  /**
   * create new contact
   * @param data : form data
   */
  createContact(data) {
    return this.http.post(this.apiRoot.concat('contacts/'), data);
  }

  /**
   * edit existing contact
   * @param id : contact's unique id number
   * @param data : form data
   */
  editContact(id, data) {
    return this.http.put<Contact>(this.apiRoot.concat(`contacts/${id}/`), data)
  }

  /**
  * get specific contact by id
  * @param id : contact's unique id number
  */
  getSpecificContact(id: number) {
    return this.http.get<Contact>(this.apiRoot.concat(`contacts/${id}/`))
  }

  /**
   * delete existing contact
   * @param id : contact's unique id number
   */
  deleteContact(id: number) {
    return this.http.delete(this.apiRoot.concat(`contacts/${id}/`))
  }
}
