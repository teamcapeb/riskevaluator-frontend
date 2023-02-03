import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationResultatSuppressionComponent } from './evaluation-resultat-suppression.component';

describe('EvaluationResultatSuppressionComponent', () => {
  let component: EvaluationResultatSuppressionComponent;
  let fixture: ComponentFixture<EvaluationResultatSuppressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationResultatSuppressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationResultatSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
