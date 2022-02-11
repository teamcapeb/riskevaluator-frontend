import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationThematiqueComponent } from './evaluation-thematique.component';

describe('EvaluationThematiqueComponent', () => {
  let component: EvaluationThematiqueComponent;
  let fixture: ComponentFixture<EvaluationThematiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationThematiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
