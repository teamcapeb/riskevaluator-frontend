import { TestBed } from '@angular/core/testing';

import { CategorieQuestionService } from './categorie-question.service';

describe('CategorieQuestionService', () => {
  let service: CategorieQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
