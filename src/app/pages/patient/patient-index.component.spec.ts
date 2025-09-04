// src/pages/Patient/patient-index.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientIndexComponent } from './patient-index.component';
import { PatientService, Patient } from '../../services/patient.service';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('PatientIndexComponent', () => {
  let component: PatientIndexComponent;
  let fixture: ComponentFixture<PatientIndexComponent>;
  let mockPatientService: jasmine.SpyObj<PatientService>;
  let patientsSubject: Subject<Patient[]>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPatients: Patient[] = [
    {
      id: 1,
      name: 'Alice',
      cpf: '12345678900',
      dateOfBirth: '1990-01-01',
      email: 'alice@test.com',
      phone: '111111111',
      address: 'Rua A, 123',
      gender: 'F'
    },
    {
      id: 2,
      name: 'Bob',
      cpf: '98765432100',
      dateOfBirth: '1985-05-10',
      email: 'bob@test.com',
      phone: '222222222',
      address: 'Rua B, 456',
      gender: 'M'
    }
  ];

  beforeEach(async () => {
    patientsSubject = new Subject<Patient[]>();

    mockPatientService = jasmine.createSpyObj('PatientService', [], {
      patients$: patientsSubject.asObservable()
    });

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PatientIndexComponent, FormsModule],
      providers: [
        { provide: PatientService, useValue: mockPatientService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients from service and update filtered list', () => {
    patientsSubject.next(mockPatients);
    expect(component.patients.length).toBe(2);
    expect(component.filteredPatients.length).toBe(2);
  });

  it('should filter patients by name, cpf, id and phone', () => {
    patientsSubject.next(mockPatients);

    component.search = 'alice';
    component.updateFilteredPatients();
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('Alice');

    component.search = '98765432100'; // CPF
    component.updateFilteredPatients();
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('Bob');

    component.search = '2'; // ID or phone
    component.updateFilteredPatients();
    expect(component.filteredPatients.some(p => p.id === 2 || p.phone?.includes('2'))).toBeTrue();

    component.search = 'nonexistent';
    component.updateFilteredPatients();
    expect(component.filteredPatients.length).toBe(0);
  });

  it('should be case-insensitive in filtering', () => {
    patientsSubject.next(mockPatients);

    component.search = 'ALICE';
    component.updateFilteredPatients();
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('Alice');
  });

  it('should navigate to the given path when navigateTo is called', () => {
    component.navigateTo('/patient/details/1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patient/details/1']);
  });

  it('should show no results when filteredPatients is empty', () => {
    patientsSubject.next([]);
    component.search = 'any';
    component.updateFilteredPatients();
    expect(component.filteredPatients.length).toBe(0);
  });
});
