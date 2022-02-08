import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetierFormComponent } from './metier-form.component';

describe('MetierFormComponent', () => {
  let component: MetierFormComponent;
  let fixture: ComponentFixture<MetierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetierFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
