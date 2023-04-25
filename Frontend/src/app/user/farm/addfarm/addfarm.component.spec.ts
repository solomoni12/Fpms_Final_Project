import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfarmComponent } from './addfarm.component';

describe('AddfarmComponent', () => {
  let component: AddfarmComponent;
  let fixture: ComponentFixture<AddfarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
