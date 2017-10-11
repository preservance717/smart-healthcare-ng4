import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from "@angular/core";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {CaseHistoryService} from "./case-history.service";
import {PatientInfo, PatientHistory} from "./patient.model";
import {Observable} from "rxjs";

@Component({
  selector: 'case-history',
  templateUrl: 'case-history.component.html',
  styleUrls: ['case-history.component.scss'],
  providers: [CaseHistoryService]
})

export class CaseHistoryComponent implements OnInit,AfterViewInit {
  @ViewChild('personId') el: ElementRef;

  step: string = '';

  caseHistoryForm: FormGroup;

  patientName: AbstractControl;
  sex: AbstractControl;
  birthday: any;
  pid: AbstractControl;
  tel: AbstractControl;
  job: AbstractControl;
  weight:AbstractControl;
  stature:AbstractControl;
  age:AbstractControl;
  smoke:AbstractControl;
  complication: AbstractControl;
  jobHistory: AbstractControl;
  dustAge: AbstractControl;
  dustProperty: AbstractControl;

  caseHistoryInfo: any = {};
  fileInfo: any = {};

  private disableUpload: boolean = false;
  private fileName: string = 'file';
  private sizeLimit = 2097152000;
  fileUploadUrl: string = '/TM/uploadFile';

  patientId: string = '';
  patientInfo: PatientInfo;

  viewBtn: boolean = true;

  medicalHistoryList: any;
  pidValidate: boolean = false;
  fileUploadVlaidate: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private _service: CaseHistoryService) {
    this.patientId = sessionStorage.getItem("patientId") || '';
    this.patientInfo = new PatientInfo();
  }

  ngOnInit() {
    if (this.patientId) {
      this.getPatientInfo();
    } else {
      this.initForm();
    }
  }

  validatePID() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: any) => text.length > 15)
      // .debounceTime(200)
      .map((query: string) => this._service.validatePID(query))
      .switch()
      .subscribe((res) => {
        if (res.aboolean == true) {
          this.pidValidate = false;
        } else {
          this.pidValidate = true;
        }
      }, (err: any) => {
        console.log(err)
      }, () => {
        console.log('complete')
      })
  }

  ngAfterViewInit() {
  }

  initForm() {
    if (!this.patientId) {
      this.patientInfo = new PatientInfo();
    }
    this.caseHistoryForm = this.fb.group({
      "patientName": [this.patientInfo.patientHistory.patientName, Validators.compose([])],
      "sex": [this.patientInfo.patientHistory.sex, Validators.compose([])],
      "stature": [this.patientInfo.patientHistory.stature, Validators.compose([])],
      "weight": [this.patientInfo.patientHistory.weight, Validators.compose([])],
      "age": [this.patientInfo.patientHistory.age, Validators.compose([])],
      "smoke": [this.patientInfo.patientHistory.smoke, Validators.compose([])],
      "pid": [this.patientInfo.patientHistory.pid, Validators.compose([])],
      "tel": [this.patientInfo.patientHistory.tel, Validators.compose([])],
      "job": [this.patientInfo.patientHistory.job, Validators.compose([])],
      "complication": [this.patientInfo.patientHistory.complication, Validators.compose([])],
      "jobHistory": [this.patientInfo.patientHistory.jobHistory, Validators.compose([])],
      "dustAge": [this.patientInfo.patientHistory.dustAge, Validators.compose([])],
      "dustProperty": [this.patientInfo.patientHistory.dustProperty, Validators.compose([])],
    });

    this.patientName = this.caseHistoryForm.controls['patientName'];
    this.sex = this.caseHistoryForm.controls['sex'];
    this.pid = this.caseHistoryForm.controls['pid'];
    this.tel = this.caseHistoryForm.controls['tel'];
    this.job = this.caseHistoryForm.controls['job'];
    this.stature = this.caseHistoryForm.controls['stature'];
    this.age = this.caseHistoryForm.controls['age'];
    this.weight = this.caseHistoryForm.controls['weight'];
    this.smoke = this.caseHistoryForm.controls['smoke'];
    this.complication = this.caseHistoryForm.controls['complication'];
    this.jobHistory = this.caseHistoryForm.controls['jobHistory'];
    this.dustAge = this.caseHistoryForm.controls['dustAge'];
    this.dustProperty = this.caseHistoryForm.controls['dustProperty'];
  }

  onSubmit(event: any) {
    if (!this.patientId) {
      this.newCaseHistory();
    } else {
      this.updateCaseHistory();
    }
  }

  newCaseHistory() {
    this.caseHistoryInfo = Object.assign(this.caseHistoryInfo, this.caseHistoryForm.value);
    this.caseHistoryInfo = Object.assign(this.caseHistoryInfo, {medicalHistories: this.medicalHistoryList});
    this.caseHistoryInfo = {
      patientHistory: this.caseHistoryInfo,
      file: this.fileInfo.file,
      medicalHistories: this.medicalHistoryList || []
    };
    this._service.newCaseHistory(this.caseHistoryInfo)
      .then(res => {
        if (res.aboolean === true) {
          this.router.navigate(["/medical-exam/pages/ra"]);
        }
      });
  }

  updateCaseHistory() {
    let updateInfo = {patientHistoryId: this.patientInfo.patientHistory.id, fileId: this.fileInfo.file};
    this._service.updateCaseHistory(updateInfo)
      .then(res => {
        if (res.aboolean) {
          this.router.navigate(["/medical-exam/pages/ra"]);
        }
      })
  }

  onFileUploading() {
    this.disableUpload = true;
  }

  onFinishUploading(replyObj: any) {
    this.fileInfo[replyObj.property] = replyObj.rsp.data;
    this.disableUpload = false;
    if (this.fileInfo.file) {
      this.fileUploadVlaidate = true;
    }
  }

  getPatientInfo() {
    if (this.patientId) {
      this._service.getPatientInfo(this.patientId)
        .then(res => {
          this.patientInfo = res.data;
          this.medicalHistoryList = res.data.medicalHistories;
          this.medicalHistoryList = this.medicalHistoryList.concat();
          this.initForm();
        })
    }
  }

  updateDateRange(event) {
    this.caseHistoryInfo["birthday"] = this.date2String(event.date);
  }

  private date2String(date: any): string {
    if (Object.keys(date).length === 0 || date === null || date === undefined || (date.year == 0 && date.month == 0 && date.day == 0)) {
      return null;
    }

    let str = date.year + '-';
    if (date.month < 10) {
      str += '0';
    }
    str += date.month + '-';

    if (date.day < 10) {
      str += '0';
    }
    str += date.day;
    return str;
  }
}
