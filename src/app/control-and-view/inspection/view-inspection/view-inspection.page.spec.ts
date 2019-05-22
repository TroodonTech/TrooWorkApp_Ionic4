import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInspectionPage } from './view-inspection.page';

describe('ViewInspectionPage', () => {
  let component: ViewInspectionPage;
  let fixture: ComponentFixture<ViewInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
