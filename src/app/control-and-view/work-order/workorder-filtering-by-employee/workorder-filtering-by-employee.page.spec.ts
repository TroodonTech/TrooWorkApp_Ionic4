import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderFilteringByEmployeePage } from './workorder-filtering-by-employee.page';

describe('WorkorderFilteringByEmployeePage', () => {
  let component: WorkorderFilteringByEmployeePage;
  let fixture: ComponentFixture<WorkorderFilteringByEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderFilteringByEmployeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderFilteringByEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
