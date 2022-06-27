import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CustomInterceptor } from './interceptors/CustomInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import * as fr from '@angular/common/locales/fr';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { MatMenu, MatChat } from '@ng-icons/material-icons/baseline';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgIconsModule.withIcons({ MatMenu, MatChat })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr_FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    },

  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
