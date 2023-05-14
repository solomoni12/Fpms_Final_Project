import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateassigmentComponent } from './updateassigment.component';

describe('UpdateassigmentComponent', () => {
  let component: UpdateassigmentComponent;
  let fixture: ComponentFixture<UpdateassigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateassigmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateassigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
