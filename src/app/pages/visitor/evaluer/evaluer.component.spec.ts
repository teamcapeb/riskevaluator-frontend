import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerComponent } from './evaluer.component';

describe('EvaluerComponent', () => {
  let component: EvaluerComponent;
  let fixture: ComponentFixture<EvaluerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
