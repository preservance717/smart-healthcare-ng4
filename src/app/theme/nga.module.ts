import {NgModule, ModuleWithProviders} from "@angular/core";
import {ShHeaderComponent} from "./components/sh-header/sh-header.component";
import {ShFooterComponent} from "./components/sh-footer/sh-footer.component";
import {FileUploadComponent} from "./components/uploadFile/file-upload.component";
import {NgUploaderModule} from "ngx-uploader";
import {CommonModule} from "@angular/common";
import {CornerstoneDirective} from "./directives/cornerstone.directive";
import {CornerstoneService} from "./services/cornerstone.service";

const NGA_COMPONENTS = [
  ShHeaderComponent,
  ShFooterComponent,
  FileUploadComponent
];

const NGA_DIRECTIVES = [
  CornerstoneDirective
];

const NGA_SERVICES = [
  CornerstoneService
];

@NgModule({
  declarations: [
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES
  ],
  imports: [
    CommonModule,
    NgUploaderModule
  ],
  exports: [
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES

  ],
  providers: [CornerstoneService],
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        ...NGA_SERVICES
      ],
    };
  }
}
