import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from "@angular/core";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {CaseHistoryService} from "./case-history.service";
import {PatientInfo} from "./patient.model";
import {Observable} from "rxjs";

@Component({
  selector: 'case-history',
  templateUrl: 'case-history.component.html',
  styleUrls: ['case-history.component.scss'],
  providers: [CaseHistoryService]
})

export class CaseHistoryComponent implements OnInit,AfterViewInit {
  @ViewChild('personId') el:ElementRef;

  locale = "en";
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-default';

  step: string = '';

  caseHistoryForm: FormGroup;

  patientName: AbstractControl;
  sex: AbstractControl;
  age: AbstractControl;
  pid: AbstractControl;
  tel: AbstractControl;
  job: AbstractControl;
  complication: AbstractControl;
  jobHistory: AbstractControl;
  medicalHistory: AbstractControl;
  dustAge: AbstractControl;
  dustProperty: AbstractControl;

  caseHistoryInfo: any = {};

  private disableUpload: boolean = false;
  private fileName: string = 'file';
  private sizeLimit = 2097152000;
  fileUploadUrl: string = 'http://localhost:4000/TM/uploadFile';

  patientId: string = '';
  patientInfo: PatientInfo;

  viewBtn: boolean = true;

  medicalHistoryList:any;
  pidValidate:boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private _service: CaseHistoryService) {
    this.patientId = sessionStorage.getItem("patientId") || '';
    this.patientInfo = new PatientInfo();
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {locale: this.locale}, {containerClass: this.colorTheme});

    if (this.patientId) {
      this.getPatientInfo();
    } else {
      this.initForm();
    }
  }

  ngAfterViewInit() {
    Observable.fromEvent(this.el.nativeElement,'keyup')
      .map((e:any) => e.target.value)
      .filter((text:any) => text.length>1)
      .debounceTime(700)
      .map((query:string)=>this._service.validatePID(query))
      .subscribe((res)=>{console.log("res",res);this.pidValidate = true},(err:any)=>{console.log(err)},()=>{console.log('complete')})
  }

  updateForm() {
    this.caseHistoryForm = this.fb.group({
      "patientName": [this.patientInfo.patientName, Validators.compose([])],
      "sex": [this.patientInfo.sex, Validators.compose([])],
      "age": [this.patientInfo.age, Validators.compose([])],
      "pid": [this.patientInfo.pid, Validators.compose([])],
      "tel": [this.patientInfo.tel, Validators.compose([])],
      "job": [this.patientInfo.job, Validators.compose([])],
      "complication": [this.patientInfo.complication, Validators.compose([])],
      "jobHistory": [this.patientInfo.jobHistory, Validators.compose([])],
      "medicalHistory": [this.patientInfo.medicalHistory, Validators.compose([])],
      "dustAge": [this.patientInfo.dustAge, Validators.compose([])],
      "dustProperty": [this.patientInfo.dustProperty, Validators.compose([])],
    });
  }

  initForm() {
    this.caseHistoryForm = this.fb.group({
      "patientName": ['', Validators.compose([])],
      "sex": ['', Validators.compose([])],
      "age": ['', Validators.compose([])],
      "pid": ['', Validators.compose([])],
      "tel": ['', Validators.compose([])],
      "job": ['', Validators.compose([])],
      "complication": ['', Validators.compose([])],
      "jobHistory": ['', Validators.compose([])],
      "medicalHistory": ['', Validators.compose([])],
      "dustAge": ['', Validators.compose([])],
      "dustProperty": ['', Validators.compose([])],
    });

    this.patientName = this.caseHistoryForm.controls['patientName'];
    this.sex = this.caseHistoryForm.controls['sex'];
    // this.age = this.caseHistoryForm.controls['age'];
    this.pid = this.caseHistoryForm.controls['pid'];
    this.tel = this.caseHistoryForm.controls['tel'];
    this.job = this.caseHistoryForm.controls['job'];
    this.complication = this.caseHistoryForm.controls['complication'];
    this.jobHistory = this.caseHistoryForm.controls['jobHistory'];
    this.medicalHistory = this.caseHistoryForm.controls['medicalHistory'];
    this.dustAge = this.caseHistoryForm.controls['dustAge'];
    this.dustProperty = this.caseHistoryForm.controls['dustProperty'];
  }

  onSubmit(event: any) {
    console.log("medicalHistoryList submit", this.medicalHistoryList);
    if (!this.patientId) {
      this.caseHistoryInfo = Object.assign(this.caseHistoryInfo, this.caseHistoryForm.value);
      this._service.newCaseHistory(this.caseHistoryInfo)
        .then(res => {
          if (res.aboolean === true) {
            this.router.navigate(["/medical-exam/pages/ra"]);
          }
        });
    } else {
      let updateInfo = {patientHistoryId: this.patientInfo.id, xRayId: this.caseHistoryInfo.file};
      this._service.updateCaseHistory(updateInfo)
        .then(res => {
          if (res.aboolean) {
            this.router.navigate(["/medical-exam/pages/ra"]);
          }
        })
    }
  }

  valueChange(value) {
    // console.log("value", value, typeof value);
  }

  onFileUploading() {
    this.disableUpload = true;
  }

  onFinishUploading(replyObj: any) {
    this.caseHistoryInfo[replyObj.property] = replyObj.rsp.data;
    this.disableUpload = false;
  }

  getPatientInfo() {
    if (this.patientId) {
      this._service.getPatientInfo(this.patientId)
        .then(res => {
          this.patientInfo = res.data;
          this.updateForm();
        })
    }
  }

  // getMedicalHistory(medicalHistoryList:any){
  //   console.log("medicalHistoryList",medicalHistoryList);
  // }
}
