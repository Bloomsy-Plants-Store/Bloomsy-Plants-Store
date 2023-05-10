import { Injectable } from '@angular/core';

const TOKEN_KEY = 'x-auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

  constructor() { }
}
