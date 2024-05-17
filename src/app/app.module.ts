import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppRoutingModule } from './app-routing.module';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ShortenStringPipe } from './pipes/shorten-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    HomeComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserDetailsComponent,
    PopUpComponent,
    ShortenStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
