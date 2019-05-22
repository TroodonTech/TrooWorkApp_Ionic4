import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderFilteringByFacilityPage } from './work-order-filtering-by-facility.page';

describe('WorkOrderFilteringByFacilityPage', () => {
  let component: WorkOrderFilteringByFacilityPage;
  let fixture: ComponentFixture<WorkOrderFilteringByFacilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderFilteringByFacilityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderFilteringByFacilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
