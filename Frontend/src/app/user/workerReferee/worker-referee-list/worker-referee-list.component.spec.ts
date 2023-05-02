import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRefereeListComponent } from './worker-referee-list.component';

describe('WorkerRefereeListComponent', () => {
  let component: WorkerRefereeListComponent;
  let fixture: ComponentFixture<WorkerRefereeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerRefereeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerRefereeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
