import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmCropListComponent } from './farm-crop-list.component';

describe('FarmCropListComponent', () => {
  let component: FarmCropListComponent;
  let fixture: ComponentFixture<FarmCropListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmCropListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmCropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
