import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PagesModule} from "./pages/pages.module";
import {Routes, RouterModule} from "@angular/router";
import {LoginModule} from "./login/login.module";
import {HttpModule} from "@angular/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const appRoutes:Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxDatatableModule,
    RouterModule.forRoot(appRoutes),
    PagesModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
