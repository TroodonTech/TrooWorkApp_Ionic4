import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionSupervisorInspectionCompletedPage } from './inspection-supervisor-inspection-completed.page';

describe('InspectionSupervisorInspectionCompletedPage', () => {
  let component: InspectionSupervisorInspectionCompletedPage;
  let fixture: ComponentFixture<InspectionSupervisorInspectionCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionSupervisorInspectionCompletedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionSupervisorInspectionCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
