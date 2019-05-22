import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderViewPage } from './workorder-view.page';

describe('WorkorderViewPage', () => {
  let component: WorkorderViewPage;
  let fixture: ComponentFixture<WorkorderViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
