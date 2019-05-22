import { TestBed, inject } from '@angular/core/testing';

import { InspectionServiceService } from './inspection-service.service';

describe('InspectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionServiceService]
    });
  });

  it('should be created', inject([InspectionServiceService], (service: InspectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
