import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmAssigmentlistComponent } from './farm-assigmentlist.component';

describe('FarmAssigmentlistComponent', () => {
  let component: FarmAssigmentlistComponent;
  let fixture: ComponentFixture<FarmAssigmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmAssigmentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmAssigmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
