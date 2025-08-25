// src/app/components/error/error-page.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPageComponent } from './error-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPageComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Ocorreu um erro');
    expect(compiled.querySelector('p')?.textContent).toContain('Desculpe, ocorreu um erro');
    expect(compiled.querySelector('a')?.getAttribute('routerLink')).toBe('/');
  });
});
