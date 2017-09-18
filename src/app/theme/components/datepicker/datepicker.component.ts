import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CONFIGS} from './datepicker-config.class';

@Component({
  selector: 'datepicker',
  template: `<my-date-picker [options]="options" (dateChanged)="onDateChanged($event)"></my-date-picker>`
})
export class DatePickerComponent implements OnInit {
  public options: any = CONFIGS;
  @Output() public onSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onDateChanged(event: any) {
    this.onSelected.emit(event);
  }
}
