import {Component, OnInit} from "@angular/core";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {CaseHistoryService} from "./case-history.service";

@Component({
  selector: 'case-history',
  templateUrl: 'case-history.component.html',
  styleUrls: ['case-history.component.scss'],
  providers: [CaseHistoryService]
})

export class CaseHistoryComponent implements OnInit {
  locale = "en";
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-default';

  step: string = '';

  caseHistoryForm: FormGroup;

  patient_name: AbstractControl;
  sex: AbstractControl;
  age: AbstractControl;
  pid: AbstractControl;
  tel: AbstractControl;
  job: AbstractControl;
  job_history: AbstractControl;
  medical_history: AbstractControl;
  dust_age: AbstractControl;
  dust_property: AbstractControl;

  caseHistoryInfo: any = {};

  private disableUpload: boolean = false;
  private labSheet: string = 'labSheet';
  private x_ray: string = 'x_ray';
  private sizeLimit = 2097152000;
  fileUploadUrl: string = 'http://localhost:8080/TM/uploadFile';

  constructor(private router: Router, private fb: FormBuilder, private _service: CaseHistoryService) {
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {locale: this.locale}, {containerClass: this.colorTheme});
    this.initForm();
  }

  initForm() {
    this.caseHistoryForm = this.fb.group({
      "patient_name": ['', Validators.compose([])],
      "sex": ['', Validators.compose([])],
      "age": ['', Validators.compose([])],
      "pid": ['', Validators.compose([])],
      "tel": ['', Validators.compose([])],
      "job": ['', Validators.compose([])],
      "job_history": ['', Validators.compose([])],
      "medical_history": ['', Validators.compose([])],
      "dust_age": ['', Validators.compose([])],
      "dust_property": ['', Validators.compose([])],
    });

    this.patient_name = this.caseHistoryForm.controls['patient_name'];
    this.sex = this.caseHistoryForm.controls['sex'];
    this.age = this.caseHistoryForm.controls['age'];
    this.pid = this.caseHistoryForm.controls['pid'];
    this.tel = this.caseHistoryForm.controls['tel'];
    this.job = this.caseHistoryForm.controls['job'];
    this.job_history = this.caseHistoryForm.controls['job_history'];
    this.medical_history = this.caseHistoryForm.controls['medical_history'];
    this.dust_age = this.caseHistoryForm.controls['dust_age'];
    this.dust_property = this.caseHistoryForm.controls['dust_property'];
  }

  onSubmit(event: any) {
    this.caseHistoryInfo = Object.assign(this.caseHistoryInfo, this.caseHistoryForm.value);
    this._service.newCaseHistory(this.caseHistoryInfo)
      .then(res => {
        if (res.aboolean === true) {
          this.router.navigate(["/medical-exam/pages/ra"]);
        }
      });
  }

  valueChange(value) {
    console.log("value", value, typeof value);
  }

  onFileUploading() {
    this.disableUpload = true;
  }

  onFinishUploading(replyObj: any) {
    this.caseHistoryInfo[replyObj.property] = replyObj.rsp.data;
    this.disableUpload = false;
  }
}
