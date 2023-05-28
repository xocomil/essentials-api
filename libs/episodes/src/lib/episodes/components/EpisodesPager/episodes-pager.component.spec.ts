import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodesPagerComponent } from './episodes-pager.component';

describe('EpisodesPagerComponent', () => {
  let component: EpisodesPagerComponent;
  let fixture: ComponentFixture<EpisodesPagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesPagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodesPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
