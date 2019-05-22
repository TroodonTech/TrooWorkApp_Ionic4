import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderFilteringByStatusPage } from './work-order-filtering-by-status.page';

describe('WorkOrderFilteringByStatusPage', () => {
  let component: WorkOrderFilteringByStatusPage;
  let fixture: ComponentFixture<WorkOrderFilteringByStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderFilteringByStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderFilteringByStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
