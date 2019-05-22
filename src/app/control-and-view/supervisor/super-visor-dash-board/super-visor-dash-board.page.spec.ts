import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperVisorDashBoardPage } from './super-visor-dash-board.page';

describe('SuperVisorDashBoardPage', () => {
  let component: SuperVisorDashBoardPage;
  let fixture: ComponentFixture<SuperVisorDashBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperVisorDashBoardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperVisorDashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
