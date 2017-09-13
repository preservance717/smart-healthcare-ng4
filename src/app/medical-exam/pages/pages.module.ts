import {NgModule, ModuleWithProviders} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CaseHistoryComponent} from "./case-history/case-history.component";
import {CaseHistoryDetailComponent} from "./case-history-detail/case-history-detail.component";
import {ResultAnalyzeComponent} from "./result-analyze/result-analyze.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {CommonModule} from "@angular/common";

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

export const routing:ModuleWithProviders = RouterModule.forChild(pagesRoutes);

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    NgaModule.forRoot(),
    routing
  ],
  declarations:[
    PagesComponent,
    DashboardComponent,
    CaseHistoryComponent,
    CaseHistoryDetailComponent,
    ResultAnalyzeComponent
  ],
  providers:[]

})

export class PagesModule{

}
