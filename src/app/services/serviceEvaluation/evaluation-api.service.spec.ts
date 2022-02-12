import { TestBed } from '@angular/core/testing';

import { EvaluationApiService } from './evaluation-api.service';

describe('EvaluationApiService', () => {
  let service: EvaluationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
