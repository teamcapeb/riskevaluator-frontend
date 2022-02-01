import { TestBed } from '@angular/core/testing';

import { PreconisationCategoriesQuestionService } from './preconisation-categories-question.service';

describe('PreconisationCategoriesQuestionService', () => {
  let service: PreconisationCategoriesQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreconisationCategoriesQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
