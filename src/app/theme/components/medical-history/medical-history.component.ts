import {Component, OnInit, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';
defineLocale('zh-cn', zhCn);

@Component({
  selector: 'medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit,OnChanges {
  // @Output() medicalHistoryChange = new EventEmitter();
  @Input('medicalHistory') medicalHistory: any[];
  @Output() medicalHistoryChange = new EventEmitter();

  medicalHistoryList: any = [];

  medicalHistoryDesc:string;
  startdate:string;
  enddate:string;

  constructor() {
  }

  ngOnInit() {
    // this.bsConfig = Object.assign({},{containerClass: this.colorTheme},{locale:'zh-cn'});
    this.medicalHistoryList = this.medicalHistory;
  }

  ngOnChanges(){
    console.log("this.medicalHistoryList on changes",this.medicalHistory);

  }

  addMedicalHistory() {
    this.medicalHistoryList.push({
      description: this.medicalHistoryDesc,
      startTime:this.startdate,
      endTime:this.enddate
    });
    this.medicalHistoryDesc = '';
    this.medicalHistoryChange.emit(this.medicalHistoryList);
  }

  updateDateRange(event) {
    this.startdate = this.date2String(event.beginDate);
    this.enddate = this.date2String(event.endDate);
  }

  private date2String(date: any): string {
    if (Object.keys(date).length === 0 || date === null || date === undefined || (date.year == 0&&date.month==0&&date.day==0)) {
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
