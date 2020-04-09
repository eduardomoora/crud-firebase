import { TestBed } from '@angular/core/testing';

import { HeroesServicesService } from './heroes-services.service';

describe('HeroesServicesService', () => {
  let service: HeroesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
