import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderSupervisorFilteringByFacilityPage } from './workorder-supervisor-filtering-by-facility.page';

describe('WorkorderSupervisorFilteringByFacilityPage', () => {
  let component: WorkorderSupervisorFilteringByFacilityPage;
  let fixture: ComponentFixture<WorkorderSupervisorFilteringByFacilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderSupervisorFilteringByFacilityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderSupervisorFilteringByFacilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
