import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderSupervisorViewDetailPage } from './workorder-supervisor-view-detail.page';

describe('WorkorderSupervisorViewDetailPage', () => {
  let component: WorkorderSupervisorViewDetailPage;
  let fixture: ComponentFixture<WorkorderSupervisorViewDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderSupervisorViewDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderSupervisorViewDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
