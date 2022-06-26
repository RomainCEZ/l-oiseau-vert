import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CustomInterceptor } from './interceptors/CustomInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import * as fr from '@angular/common/locales/fr';
import { RouterModule } from '@angular/router';
import { PostContainerComponent } from '../posts/components/post-container/post-container.component';
import { PostsModule } from '../posts/posts.module';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr_FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
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
