import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerlistingComponent } from './workerlisting.component';

describe('WorkerlistingComponent', () => {
  let component: WorkerlistingComponent;
  let fixture: ComponentFixture<WorkerlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
