// src/app/components/footer/footer.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const year = new Date().getFullYear().toString();
    expect(compiled.querySelector('footer')?.textContent).toContain(year);
  });
});
