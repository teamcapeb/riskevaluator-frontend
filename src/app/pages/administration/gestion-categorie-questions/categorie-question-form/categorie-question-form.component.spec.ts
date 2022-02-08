import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieQuestionFormComponent } from './categorie-question-form.component';

describe('CategorieQuestionFormComponent', () => {
  let component: CategorieQuestionFormComponent;
  let fixture: ComponentFixture<CategorieQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieQuestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
