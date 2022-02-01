import { TestBed } from '@angular/core/testing';

import { PreconisationGlobaleService } from './preconisation-globale.service';

describe('PreconisationGlobaleService', () => {
  let service: PreconisationGlobaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreconisationGlobaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
