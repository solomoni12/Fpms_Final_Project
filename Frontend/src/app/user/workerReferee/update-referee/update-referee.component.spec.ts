import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRefereeComponent } from './update-referee.component';

describe('UpdateRefereeComponent', () => {
  let component: UpdateRefereeComponent;
  let fixture: ComponentFixture<UpdateRefereeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRefereeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
