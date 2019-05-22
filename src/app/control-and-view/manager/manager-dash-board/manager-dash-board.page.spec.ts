import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashBoardPage } from './manager-dash-board.page';

describe('ManagerDashBoardPage', () => {
  let component: ManagerDashBoardPage;
  let fixture: ComponentFixture<ManagerDashBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDashBoardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
