// src/app/components/layout/navbar/navbar.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar', () => {
    expect(component).toBeTruthy();
  });

  it('should have all navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('.navLink'));
    const linkTexts = links.map(el => el.nativeElement.textContent.trim());
    expect(linkTexts).toEqual(['Home', 'Pacientes', 'Médicos', 'Especialidades', 'Consultas']);
  });

  it('should toggle menuOpen when toggle button is clicked', () => {
    const toggleButton = fixture.debugElement.query(By.css('#navbarToggle'));
    expect(component.menuOpen).toBeFalse();
    toggleButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();
    toggleButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse();
  });

  it('should close menu when link is clicked', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const firstLink = fixture.debugElement.query(By.css('.navLink'));
    firstLink.nativeElement.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse();
  });
});
