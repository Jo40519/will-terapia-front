import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  checked!: boolean
  constructor(@Inject(DOCUMENT) private document: Document) { }

  changeTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement

    if(themeLink) {
      themeLink.href = `${theme}.css`
    }
  }
}
