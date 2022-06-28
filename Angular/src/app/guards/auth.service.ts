import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }
  isAuthenticated(): boolean {
    console.log(localStorage.getItem('tokenId') != null);
    return localStorage.getItem('tokenId') != null && !this.isTokenExpired();
  }
  isTokenExpired(): boolean {
    return false;
  }
}
