// src/pages/patient/delete/delete-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePatientComponent } from './delete-patient.component';
import { PatientService, Patient } from '../../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('DeletePatientComponent', () => {
  let component: DeletePatientComponent;
  let fixture: ComponentFixture<DeletePatientComponent>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const patientMock: Patient = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    dateOfBirth: '1990-01-01',
    email: 'joao@email.com',
    phone: '999999999',
    address: 'Rua Teste, 123',
    gender: 'Masculino',
  };

  beforeEach(async () => {
    patientServiceSpy = jasmine.createSpyObj('PatientService', ['getById', 'delete']);
    patientServiceSpy.getById.and.returnValue(of(patientMock));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [DeletePatientComponent, CommonModule],
      providers: [
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load patient on init', () => {
    expect(patientServiceSpy.getById).toHaveBeenCalledWith(1);
    expect(component.patient).toEqual(patientMock);

    const strongEl = fixture.debugElement.query(By.css('strong')).nativeElement;
    expect(strongEl.textContent).toContain('João Silva');
  });

  it('should navigate to /patient when handleCancel is called', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should delete patient and navigate if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.handleDelete();

    expect(patientServiceSpy.delete).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should not delete or navigate if deletion is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.patient = patientMock;
    component.handleDelete();

    expect(patientServiceSpy.delete).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should show loading template if patient is null', () => {
    component.patient = null;
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('p'));
    expect(loadingEl.nativeElement.textContent).toContain('Carregando...');
  });
});
