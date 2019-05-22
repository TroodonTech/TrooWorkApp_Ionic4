import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInspectionPage } from './create-inspection.page';

describe('CreateInspectionPage', () => {
  let component: CreateInspectionPage;
  let fixture: ComponentFixture<CreateInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
