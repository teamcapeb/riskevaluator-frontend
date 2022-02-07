import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseFormComponent } from './reponse-form.component';

describe('ReponseFormComponent', () => {
  let component: ReponseFormComponent;
  let fixture: ComponentFixture<ReponseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
