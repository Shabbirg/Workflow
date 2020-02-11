import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { GetNotificationComponent } from './get-notification/get-notification.component';
import { FormComponentComponent } from './form-component/form-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SendMailComponent,
    GetNotificationComponent,
    FormComponentComponent
  ],
  entryComponents: [SendMailComponent, GetNotificationComponent],
  imports: [
    BrowserModule, NgbModule, FormsModule, ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
