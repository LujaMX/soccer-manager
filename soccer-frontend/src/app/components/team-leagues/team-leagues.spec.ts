import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeagues } from './team-leagues';

describe('TeamLeagues', () => {
  let component: TeamLeagues;
  let fixture: ComponentFixture<TeamLeagues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamLeagues],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamLeagues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
