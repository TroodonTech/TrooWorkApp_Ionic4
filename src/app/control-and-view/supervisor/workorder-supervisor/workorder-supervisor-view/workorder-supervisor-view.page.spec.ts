import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderSupervisorViewPage } from './workorder-supervisor-view.page';

describe('WorkorderSupervisorViewPage', () => {
  let component: WorkorderSupervisorViewPage;
  let fixture: ComponentFixture<WorkorderSupervisorViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderSupervisorViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderSupervisorViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
