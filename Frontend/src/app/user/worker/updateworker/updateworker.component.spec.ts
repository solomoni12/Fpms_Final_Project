import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateworkerComponent } from './updateworker.component';

describe('UpdateworkerComponent', () => {
  let component: UpdateworkerComponent;
  let fixture: ComponentFixture<UpdateworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateworkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
