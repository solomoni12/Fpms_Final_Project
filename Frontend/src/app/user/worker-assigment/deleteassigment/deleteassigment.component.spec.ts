import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteassigmentComponent } from './deleteassigment.component';

describe('DeleteassigmentComponent', () => {
  let component: DeleteassigmentComponent;
  let fixture: ComponentFixture<DeleteassigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteassigmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteassigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
