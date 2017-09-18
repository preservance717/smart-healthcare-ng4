import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CONFIGS } from './datepicker-config.class';

@Component({
    selector: 'date-range-picker',
    template: `<my-date-range-picker [options]="options" (dateRangeChanged)="onDateChanged($event)"></my-date-range-picker>`
})
export class DateRangePickerComponent implements OnInit {
    public options: any = CONFIGS;
    @Output() public onSelected: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onDateChanged(event: any) {
        this.onSelected.emit(event);
    }
}