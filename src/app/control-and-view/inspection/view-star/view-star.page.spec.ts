import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStarPage } from './view-star.page';

describe('ViewStarPage', () => {
  let component: ViewStarPage;
  let fixture: ComponentFixture<ViewStarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
