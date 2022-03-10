import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterEvaluationItemComponent } from './consulter-evaluation-item.component';

describe('ConsulterEvaluationItemComponent', () => {
  let component: ConsulterEvaluationItemComponent;
  let fixture: ComponentFixture<ConsulterEvaluationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterEvaluationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterEvaluationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
