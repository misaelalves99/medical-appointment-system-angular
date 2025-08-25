// src/pages/Patient/patient-index.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientIndexComponent } from './patient-index.component';
import { PatientService, Patient } from '../../services/patient.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('PatientIndexComponent', () => {
  let component: PatientIndexComponent;
  let fixture: ComponentFixture<PatientIndexComponent>;
  let mockPatientService: any;

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
    mockPatientService = {
      getPatients: jasmine.createSpy('getPatients').and.returnValue(of(mockPatients))
    };

    await TestBed.configureTestingModule({
      imports: [PatientIndexComponent, RouterTestingModule, FormsModule],
      providers: [{ provide: PatientService, useValue: mockPatientService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients on ngOnInit', () => {
    expect(mockPatientService.getPatients).toHaveBeenCalled();
    expect(component.patients.length).toBe(2);
  });

  it('should filter patients by search term', () => {
    component.search = 'alice';
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('Alice');

    component.search = '98765432100'; // CPF
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('Bob');

    component.search = 'nonexistent';
    expect(component.filteredPatients.length).toBe(0);
  });

  it('should be case-insensitive in filtering', () => {
    component.search = 'ALICE';
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('Alice');
  });
});
