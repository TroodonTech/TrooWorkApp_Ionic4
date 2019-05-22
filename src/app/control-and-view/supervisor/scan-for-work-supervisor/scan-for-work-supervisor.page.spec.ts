import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanForWorkSupervisorPage } from './scan-for-work-supervisor.page';

describe('ScanForWorkSupervisorPage', () => {
  let component: ScanForWorkSupervisorPage;
  let fixture: ComponentFixture<ScanForWorkSupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanForWorkSupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanForWorkSupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
