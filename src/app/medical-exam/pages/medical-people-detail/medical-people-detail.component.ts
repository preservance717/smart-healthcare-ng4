import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
import {MedicalPeopleDetailService} from "./medical-people-detail.service";
declare const cornerstone;
@Component({
  selector: 'app-medical-people-detail',
  templateUrl: './medical-people-detail.component.html',
  styleUrls: ['medical-people-detail.component.scss'],
  providers:[MedicalPeopleDetailService]
})
export class MedicalPeopleDetailComponent implements OnInit {
  imageData: any;
  imageList = [];

  demoList = [1,2];
  dcmElement:any;

  patientInfo:any;

  constructor(public csS: CornerstoneService,public elementRef:ElementRef,public _service:MedicalPeopleDetailService) { }

  ngOnInit() {
    this.reviewPatientDetail();
  }

  reviewPatientDetail(){
    let patientId = sessionStorage.getItem("patientId");
    this._service.reviewPatientDetail(patientId)
      .then(res=>{
        this.patientInfo = res.data;
      })
  }

  openAccordion(i){
    this.dcmElement = this.elementRef.nativeElement.querySelector("#dicomImage"+i);

    setTimeout(() => {
      cornerstone.enable(this.dcmElement);

      this.csS.fetchDicomImage(`/TM/files/${this.patientInfo.file}`)
        .subscribe(res => {
          this.imageData = res;
          if (this.imageData) {
            this.displayImage(this.imageData);
            if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
              this.imageList.push(this.imageData);
            }
          }
        });
    }, 0);
  }

  displayImage(image) {
    cornerstone.displayImage(this.dcmElement, image);
  }
}
