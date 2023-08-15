import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProgramReviwPageComponent } from './workout-program-reviw-page.component';

describe('WorkoutProgramReviwPageComponent', () => {
  let component: WorkoutProgramReviwPageComponent;
  let fixture: ComponentFixture<WorkoutProgramReviwPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutProgramReviwPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutProgramReviwPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
