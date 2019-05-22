import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanForWorkPage } from './scan-for-work.page';

describe('ScanForWorkPage', () => {
  let component: ScanForWorkPage;
  let fixture: ComponentFixture<ScanForWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanForWorkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanForWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
