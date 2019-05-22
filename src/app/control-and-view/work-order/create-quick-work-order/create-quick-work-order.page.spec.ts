import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuickWorkOrderPage } from './create-quick-work-order.page';

describe('CreateQuickWorkOrderPage', () => {
  let component: CreateQuickWorkOrderPage;
  let fixture: ComponentFixture<CreateQuickWorkOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuickWorkOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuickWorkOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
