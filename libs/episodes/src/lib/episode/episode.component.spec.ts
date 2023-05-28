import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisoideComponent } from './episode.component';

describe('EpisoideComponent', () => {
  let component: EpisoideComponent;
  let fixture: ComponentFixture<EpisoideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisoideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisoideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
