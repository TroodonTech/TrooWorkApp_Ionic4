import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionCompletedPage } from './inspection-completed.page';

describe('InspectionCompletedPage', () => {
  let component: InspectionCompletedPage;
  let fixture: ComponentFixture<InspectionCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionCompletedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
