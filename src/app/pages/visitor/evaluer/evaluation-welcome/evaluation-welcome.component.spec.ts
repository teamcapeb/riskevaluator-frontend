import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationWelcomeComponent } from './evaluation-welcome.component';

describe('EvaluationWelcomeComponent', () => {
  let component: EvaluationWelcomeComponent;
  let fixture: ComponentFixture<EvaluationWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
