import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IContact } from '../../shared/models/contact';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create contacts
  createContacts(contact): Observable<IContact> {
    return this.http
      .post<IContact>(this.apiUrl + '/contacts', contact)
      .pipe(catchError(this.error));
  }

  // Read contacts
  showContacts() {
    return this.http.get(`${this.apiUrl}/contacts`);
  }

  // Get contact detsila by id
  getCotactDetails(id): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl + '/contacts/' + id);
  }

  // Update contacts
  updateContact(id: string, contact: IContact): Observable<IContact[]> {
    return this.http.put<IContact[]>(`${this.apiUrl}/contacts/${id}`, contact, {
      headers: this.headers,
    });
  }

  // Delete a contact
  deleteContact(id: any): Observable<IContact[]> {
    const url = `${this.apiUrl}/contacts/${id}`;
    return this.http.delete<IContact[]>(url, {
      headers: this.headers,
    });
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
