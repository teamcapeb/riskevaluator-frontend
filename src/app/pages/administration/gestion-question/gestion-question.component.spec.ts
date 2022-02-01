import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionQuestionComponent } from './gestion-question.component';

describe('GestionQuestionComponent', () => {
  let component: GestionQuestionComponent;
  let fixture: ComponentFixture<GestionQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
