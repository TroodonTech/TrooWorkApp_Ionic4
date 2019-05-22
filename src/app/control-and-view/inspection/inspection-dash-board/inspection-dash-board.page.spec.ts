import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionDashBoardPage } from './inspection-dash-board.page';

describe('InspectionDashBoardPage', () => {
  let component: InspectionDashBoardPage;
  let fixture: ComponentFixture<InspectionDashBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionDashBoardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionDashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
