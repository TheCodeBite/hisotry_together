import { TestBed } from '@angular/core/testing';

import { GaleriServiceService } from './galeri-service.service';

describe('GaleriServiceService', () => {
  let service: GaleriServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaleriServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
