// src/pages/HomePage/home-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome message', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Bem-vindo ao Sistema de Agendamento Médico');
  });

  it('should render all navigation links with correct routerLink', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));

    expect(links.length).toBe(4);

    expect(links[0].attributes['ng-reflect-router-link']).toBe('/patient');
    expect(links[1].attributes['ng-reflect-router-link']).toBe('/doctor');
    expect(links[2].attributes['ng-reflect-router-link']).toBe('/specialty');
    expect(links[3].attributes['ng-reflect-router-link']).toBe('/appointment');
  });

  it('should display correct button text', () => {
    const buttons = fixture.debugElement.queryAll(By.css('a'));
    const texts = buttons.map((b) => b.nativeElement.textContent.trim());

    expect(texts).toEqual([
      'Gerenciar Pacientes',
      'Gerenciar Médicos',
      'Gerenciar Especialidades',
      'Gerenciar Consultas',
    ]);
  });
});
