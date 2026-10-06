import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Expert } from './expert';

describe('Expert', () => {
  let component: Expert;
  let fixture: ComponentFixture<Expert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expert],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(Expert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});