import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatItemComponent } from './resultat-item.component';

describe('ResultatItemComponent', () => {
  let component: ResultatItemComponent;
  let fixture: ComponentFixture<ResultatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
