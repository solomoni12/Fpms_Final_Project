import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentlistComponent } from './equipmentlist.component';

describe('EquipmentlistComponent', () => {
  let component: EquipmentlistComponent;
  let fixture: ComponentFixture<EquipmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
