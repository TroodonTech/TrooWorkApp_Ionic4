import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadPage } from './file-upload.page';

describe('FileUploadPage', () => {
  let component: FileUploadPage;
  let fixture: ComponentFixture<FileUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
