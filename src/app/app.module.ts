import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PagesModule} from "./pages/pages.module";
import {Routes, RouterModule} from "@angular/router";

const appRoutes:Routes = [
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  { path: '**', redirectTo: 'pages' }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
