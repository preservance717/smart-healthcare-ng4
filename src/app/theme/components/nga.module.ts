import {NgModule, ModuleWithProviders} from "@angular/core";
import {ShHeaderComponent} from "./sh-header/sh-header.component";
import {ShFooterComponent} from "./sh-footer/sh-footer.component";
import {CommonModule} from "@angular/common";
import {FileUploadComponent} from "./uploadFile/file-upload.component";
import { NgUploaderModule } from 'ngx-uploader';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    ShHeaderComponent,
    ShFooterComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgUploaderModule
  ],
  exports:[
    ShHeaderComponent,
    ShFooterComponent,
    FileUploadComponent
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
