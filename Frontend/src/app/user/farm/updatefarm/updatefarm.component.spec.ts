import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefarmComponent } from './updatefarm.component';

describe('UpdatefarmComponent', () => {
  let component: UpdatefarmComponent;
  let fixture: ComponentFixture<UpdatefarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatefarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
