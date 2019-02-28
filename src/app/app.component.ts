import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(translate: TranslateService, public router: Router, matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    translate.setDefaultLang('es');
    translate.use('es');

    matIconRegistry.addSvgIcon('arrow-back', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow_back.svg'));
    matIconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/add.svg'));
    matIconRegistry.addSvgIcon('file', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/file.svg'));
    matIconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit.svg'));
    matIconRegistry.addSvgIcon('download', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/download.svg'));
    matIconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/delete.svg'));
    matIconRegistry.addSvgIcon('view', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/view.svg'));
  }
}
