import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
import {MedicalPeopleDetailService} from "./medical-people-detail.service";
import * as $ from "jquery";
declare const cornerstone;
declare const cornerstoneTools;

@Component({
  selector: 'app-medical-people-detail',
  templateUrl: './medical-people-detail.component.html',
  styleUrls: ['medical-people-detail.component.scss'],
  providers:[MedicalPeopleDetailService]
})
export class MedicalPeopleDetailComponent implements OnInit {
  @ViewChild('fullDcmEle') fullDcmEle: ElementRef;

  imageData: any;
  imageList = [];

  dcmElement:any;
  fullDcmElement:any;

  patientInfo:any;
  fullScreenBtn: boolean = false;
  index:number = 0;

  constructor(public csS: CornerstoneService,public elementRef:ElementRef,public _service:MedicalPeopleDetailService) {
  }

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
    this.index = i;
    this.dcmElement = this.elementRef.nativeElement.querySelector("#dicomImage"+i);
    setTimeout(() => {
      cornerstone.enable(this.dcmElement);

      this.csS.fetchDicomImage(`/TM/files/${this.patientInfo.xrayTaskDTOList[i].fileName}`)
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

  reviewFullScreen() {
    this.fullScreenBtn = true;
    // this.fullDcmElement = this.elementRef.nativeElement.querySelector("#fullDicomImage");
    // console.log("this.fullDcmElement",this.fullDcmElement);
    setTimeout(() => {
      cornerstone.enable(this.fullDcmEle.nativeElement);

      this.csS.fetchDicomImage(`/TM/files/${this.patientInfo.xrayTaskDTOList[this.index].fileName}`)
        .subscribe(res => {
          this.imageData = res;
          if (this.imageData) {

            if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
              this.imageList.push(this.imageData);
            }

            if (this.imageData.imageId) {
              this.activeDcm(this.fullDcmEle.nativeElement, this.imageData);
              this.dcmDescripe();
            }
          }
        });
    }, 0)
  }
  dcmDescripe(){
    $('#columns').text(this.imageData.data.uint16('x00280011'));
    $('#rows').text(this.imageData.data.uint16('x00280010'));
  }

  activeDcm(ele, imageData){
    cornerstone.displayImage(ele, imageData);
    cornerstoneTools.mouseInput.enable(ele);
    cornerstoneTools.mouseWheelInput.enable(ele);

    // Enable all tools we want to use with this ele
    cornerstoneTools.wwwc.activate(ele, 1); // ww/wc is the default tool for left mouse button
    cornerstoneTools.pan.activate(ele, 2); // pan is the default tool for middle mouse button
    cornerstoneTools.zoom.activate(ele, 4); // zoom is the default tool for right mouse button
    cornerstoneTools.zoomWheel.activate(ele); // zoom is the default tool for middle mouse wheel
  }

  backDetail() {
    this.fullScreenBtn = false;
    setTimeout(() => {
      // this.initImage(this.patientInfo.xrayTaskDTOList[this.index].fileName);
      cornerstone.enable(this.dcmElement);

      this.csS.fetchDicomImage(`/TM/files/${this.patientInfo.xrayTaskDTOList[this.index].fileName}`)
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

}
