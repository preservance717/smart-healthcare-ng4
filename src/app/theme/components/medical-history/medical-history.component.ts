import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';
defineLocale('zh-cn', zhCn);

@Component({
  selector: 'medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  // @Output() medicalHistoryChange = new EventEmitter();
  @Input('medicalHistory') medicalHistory: any[];
  @Output() medicalHistoryChange = new EventEmitter();

  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-default';
  medicalHistoryList: any = [];
  _bsRangeValue: any = [new Date(2017, 7, 4), new Date(2037, 7, 20)];
  medicalHistoryDesc:string;

  constructor() {
  }

  ngOnInit() {
    this.bsConfig = Object.assign({},{containerClass: this.colorTheme},{locale:'zh-cn'});
  }

  get bsRangeValue(): any {
    return this._bsRangeValue;
  }

  set bsRangeValue(v: any) {
    console.log("v",v);
    this._bsRangeValue = v;
  }

  addMedicalHistory() {
    console.log(this.bsRangeValue[0], "bssss", this.medicalHistoryDesc);
    this.medicalHistoryList.push({
      desc: this.medicalHistoryDesc,
      timeZone: `${this.bsRangeValue[0]} - ${this.bsRangeValue[1]}`
    });
    this.medicalHistoryDesc = '';
    this._bsRangeValue = [new Date(), new Date()];
    this.medicalHistoryChange.emit(this.medicalHistoryList);
    console.log(this.medicalHistoryList);
  }

}
