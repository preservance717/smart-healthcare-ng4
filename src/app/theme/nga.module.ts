import {NgModule, ModuleWithProviders} from "@angular/core";
import {ShHeaderComponent} from "./components/sh-header/sh-header.component";
import {ShFooterComponent} from "./components/sh-footer/sh-footer.component";
import {FileUploadComponent} from "./components/uploadFile/file-upload.component";
import {NgUploaderModule} from "ngx-uploader";
import {CommonModule} from "@angular/common";
// import {CornerstoneDirective} from "./directives/cornerstone.directive";
import {CornerstoneService} from "./services/cornerstone.service";
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import {BsDatepickerModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {DateRangePickerComponent} from "./components/datepicker/date-range-picker.component";
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {DatePickerComponent} from "./components/datepicker/datepicker.component";

const NGA_COMPONENTS = [
  ShHeaderComponent,
  ShFooterComponent,
  FileUploadComponent,
  MedicalHistoryComponent,
  DateRangePickerComponent,
  DatePickerComponent
];

const NGA_DIRECTIVES = [
  // CornerstoneDirective
];

const NGA_SERVICES = [
  CornerstoneService
];

@NgModule({
  declarations: [
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgUploaderModule,
    BsDatepickerModule.forRoot(),
    MyDatePickerModule,
    MyDateRangePickerModule
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
