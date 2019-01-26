import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './userList/userList.component';

import { AddComponent } from './add/add.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,

    AddComponent,

],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatIconModule,
    AngularFontAwesomeModule


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

