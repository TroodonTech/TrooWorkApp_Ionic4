import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMenuPage } from './manager-menu.page';

describe('ManagerMenuPage', () => {
  let component: ManagerMenuPage;
  let fixture: ComponentFixture<ManagerMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
