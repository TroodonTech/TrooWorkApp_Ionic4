import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionSupervisorViewPage } from './inspection-supervisor-view.page';

describe('InspectionSupervisorViewPage', () => {
  let component: InspectionSupervisorViewPage;
  let fixture: ComponentFixture<InspectionSupervisorViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionSupervisorViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionSupervisorViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
