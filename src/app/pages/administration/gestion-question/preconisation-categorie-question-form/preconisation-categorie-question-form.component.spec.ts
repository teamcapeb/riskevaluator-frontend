import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconisationCategorieQuestionFormComponent } from './preconisation-categorie-question-form.component';

describe('PreconisationCategorieQuestionFormComponent', () => {
  let component: PreconisationCategorieQuestionFormComponent;
  let fixture: ComponentFixture<PreconisationCategorieQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreconisationCategorieQuestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreconisationCategorieQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
