import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionSupervisorViewDetailPage } from './inspection-supervisor-view-detail.page';

describe('InspectionSupervisorViewDetailPage', () => {
  let component: InspectionSupervisorViewDetailPage;
  let fixture: ComponentFixture<InspectionSupervisorViewDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionSupervisorViewDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionSupervisorViewDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
