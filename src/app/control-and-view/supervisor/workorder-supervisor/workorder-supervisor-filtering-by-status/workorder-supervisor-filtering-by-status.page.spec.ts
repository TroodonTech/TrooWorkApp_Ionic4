import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderSupervisorFilteringByStatusPage } from './workorder-supervisor-filtering-by-status.page';

describe('WorkorderSupervisorFilteringByStatusPage', () => {
  let component: WorkorderSupervisorFilteringByStatusPage;
  let fixture: ComponentFixture<WorkorderSupervisorFilteringByStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderSupervisorFilteringByStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderSupervisorFilteringByStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
