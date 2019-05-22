import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderSupervisorFilteringByEmployeePage } from './workorder-supervisor-filtering-by-employee.page';

describe('WorkorderSupervisorFilteringByEmployeePage', () => {
  let component: WorkorderSupervisorFilteringByEmployeePage;
  let fixture: ComponentFixture<WorkorderSupervisorFilteringByEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderSupervisorFilteringByEmployeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderSupervisorFilteringByEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
