/**
 * Created by gaole on 2017/9/12.
 */
import {NgModule, ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginModule} from "./login/login.module";
import {MZPlatformComponent} from "./mz-platform.component";

const MZRoutes:Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '**', redirectTo: 'login' }
];
export const routing:ModuleWithProviders = RouterModule.forChild(MZRoutes);
@NgModule({
  imports:[
    routing,
    LoginModule
  ],
  declarations:[
    MZPlatformComponent
  ],
  providers:[]
})

export class MZPlatformExamModule{

}
