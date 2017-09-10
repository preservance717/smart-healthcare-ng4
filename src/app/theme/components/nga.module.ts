import {NgModule, ModuleWithProviders} from "@angular/core";
import {ShHeaderComponent} from "./sh-header/sh-header.component";
import {ShFooterComponent} from "./sh-footer/sh-footer.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ShHeaderComponent,
    ShFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ShHeaderComponent,
    ShFooterComponent
  ],
  providers: [],
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
      ],
    };
  }
}
