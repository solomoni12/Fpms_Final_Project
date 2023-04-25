import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmAssigmentComponent } from './farm-assigment.component';

describe('FarmAssigmentComponent', () => {
  let component: FarmAssigmentComponent;
  let fixture: ComponentFixture<FarmAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmAssigmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
