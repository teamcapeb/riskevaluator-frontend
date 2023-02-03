import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEntrepriseComponent } from './details-entreprise.component';

describe('DetailsEntrepriseComponent', () => {
  let component: DetailsEntrepriseComponent;
  let fixture: ComponentFixture<DetailsEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
