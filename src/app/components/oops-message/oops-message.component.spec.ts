import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsMessageComponent } from './oops-message.component';

describe('OopsMessageComponent', () => {
  let component: OopsMessageComponent;
  let fixture: ComponentFixture<OopsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OopsMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OopsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
