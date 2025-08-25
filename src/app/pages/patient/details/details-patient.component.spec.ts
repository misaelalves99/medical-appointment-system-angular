// src/pages/patient/details/details-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPatientComponent, Patient } from './details-patient.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DetailsPatientComponent', () => {
  let component: DetailsPatientComponent;
  let fixture: ComponentFixture<DetailsPatientComponent>;
  let mockRouter: any;

  const patientMock: Patient = {
    id: 1,
    name: 'João Silva',
    dateOfBirth: '1990-05-10',
    gender: 'Masculino',
    phone: '123456789',
    email: 'joao@example.com'
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [DetailsPatientComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPatientComponent);
    component = fixture.componentInstance;
    component.patient = patientMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display patient information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('João Silva');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('10/05/1990'); // formatDate pt-BR
    expect(compiled.querySelector('p:nth-of-type(3)')?.textContent).toContain('Masculino');
    expect(compiled.querySelector('p:nth-of-type(4)')?.textContent).toContain('123456789');
    expect(compiled.querySelector('p:nth-of-type(5)')?.textContent).toContain('joao@example.com');
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2025-08-21T00:00:00.000Z');
    const date = new Date('2025-08-21T00:00:00.000Z');
    const expected = date.toLocaleDateString('pt-BR');
    expect(formatted).toBe(expected);
  });

  it('should navigate to edit page when goToEdit is called', () => {
    component.goToEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient/edit/1']);
  });

  it('should navigate back to patient list when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should trigger goToEdit on edit button click', () => {
    const btn = fixture.debugElement.query(By.css('button.edit'));
    btn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient/edit/1']);
  });

  it('should trigger goBack on back button click', () => {
    const btn = fixture.debugElement.query(By.css('button.back'));
    btn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
