import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmlistingComponent } from './farmlisting.component';

describe('FarmlistingComponent', () => {
  let component: FarmlistingComponent;
  let fixture: ComponentFixture<FarmlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
