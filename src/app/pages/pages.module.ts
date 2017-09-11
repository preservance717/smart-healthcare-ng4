import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CaseHistoryComponent} from "./case-history/case-history.component";
import {CaseHistoryDetailComponent} from "./case-history-detail/case-history-detail.component";
import {ResultAnalyzeComponent} from "./result-analyze/result-analyze.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgaModule} from "../theme/components/nga.module";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BsDatepickerModule} from "ngx-bootstrap";

const pagesRoutes: Routes = [{
  path: 'pages',
  component:PagesComponent,
  children:[
    {path:'db', component:DashboardComponent},
    {path:'ch', component:CaseHistoryComponent},
    {path:'chd', component:CaseHistoryDetailComponent},
    {path:'ra', component:ResultAnalyzeComponent},
    {path:'',redirectTo:'db',pathMatch:'full'}
  ]
}];

@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    NgaModule.forRoot(),
    RouterModule.forRoot(pagesRoutes)
  ],
  declarations:[
    PagesComponent,
    DashboardComponent,
    CaseHistoryComponent,
    CaseHistoryDetailComponent,
    ResultAnalyzeComponent
  ]
})

export class PagesModule{

}
