import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassigmentComponent } from './addassigment.component';

describe('AddassigmentComponent', () => {
  let component: AddassigmentComponent;
  let fixture: ComponentFixture<AddassigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddassigmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddassigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
