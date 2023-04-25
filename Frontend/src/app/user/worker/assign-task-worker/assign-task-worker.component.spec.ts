import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskWorkerComponent } from './assign-task-worker.component';

describe('AssignTaskWorkerComponent', () => {
  let component: AssignTaskWorkerComponent;
  let fixture: ComponentFixture<AssignTaskWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTaskWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
