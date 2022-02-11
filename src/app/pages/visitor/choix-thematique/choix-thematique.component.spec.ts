import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixThematiqueComponent } from './choix-thematique.component';

describe('ChoixThematiqueComponent', () => {
  let component: ChoixThematiqueComponent;
  let fixture: ComponentFixture<ChoixThematiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixThematiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
