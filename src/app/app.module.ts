import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PostsModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
