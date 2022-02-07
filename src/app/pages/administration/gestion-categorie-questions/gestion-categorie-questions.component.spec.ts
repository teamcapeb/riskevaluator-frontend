import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategorieQuestionsComponent } from './gestion-categorie-questions.component';

describe('GestionCategorieQuestionsComponent', () => {
  let component: GestionCategorieQuestionsComponent;
  let fixture: ComponentFixture<GestionCategorieQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCategorieQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCategorieQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
