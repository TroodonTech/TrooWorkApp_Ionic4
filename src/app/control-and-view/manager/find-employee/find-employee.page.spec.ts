import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEmployeePage } from './find-employee.page';

describe('FindEmployeePage', () => {
  let component: FindEmployeePage;
  let fixture: ComponentFixture<FindEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindEmployeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
