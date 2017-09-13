/**
 * Created by gaole on 2017/9/12.
 */
import {NgModule, ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MedicalExamComponent} from "./medical-exam.component";
import {LoginModule} from "./login/login.module";
import {PagesModule} from "./pages/pages.module";
import {MedicalExamState} from "./medical-exam.state";

const MERoutes:Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '**', redirectTo: 'login' }
];
export const routing:ModuleWithProviders = RouterModule.forChild(MERoutes);
@NgModule({
  imports:[
    routing,
    PagesModule,
    LoginModule
  ],
  declarations:[
    MedicalExamComponent
  ],
  providers:[MedicalExamState]
})

export class MedicalExamModule{

}
