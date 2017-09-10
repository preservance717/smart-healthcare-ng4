import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShFooterComponent } from './sh-footer.component';

describe('ShFooterComponent', () => {
  let component: ShFooterComponent;
  let fixture: ComponentFixture<ShFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
