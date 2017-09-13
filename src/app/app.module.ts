import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Routes, RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {MedicalExamModule} from "./medical-exam/medical-exam.module";
import {GlobalState} from "./global.state";

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'medical-exam',
        loadChildren: "app/medical-exam/medical-exam.module#MedicalExamModule"
      },

      {path: '', redirectTo: 'medical-exam', pathMatch: 'full'}
      ]
  }
  // { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // MedicalExamModule
  ],
  providers: [GlobalState],
  bootstrap: [AppComponent]
})
export class AppModule {
}
