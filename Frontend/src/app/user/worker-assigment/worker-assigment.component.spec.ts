import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAssigmentComponent } from './worker-assigment.component';

describe('WorkerAssigmentComponent', () => {
  let component: WorkerAssigmentComponent;
  let fixture: ComponentFixture<WorkerAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerAssigmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
