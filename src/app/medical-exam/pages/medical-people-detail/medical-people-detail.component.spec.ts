import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPeopleDetailComponent } from './medical-people-detail.component';

describe('MedicalPeopleDetailComponent', () => {
  let component: MedicalPeopleDetailComponent;
  let fixture: ComponentFixture<MedicalPeopleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalPeopleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalPeopleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
