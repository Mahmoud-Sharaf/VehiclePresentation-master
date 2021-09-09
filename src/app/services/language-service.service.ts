import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  constructor() { }

  getLanguage(): string {
    if (localStorage) {
      return localStorage['currentLanguage'] || 'Arabic';
    } else {
      return 'Arabic';
    }
  }
}
