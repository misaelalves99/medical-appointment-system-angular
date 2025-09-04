// src/pages/Patient/Create/create-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CreatePatientComponent } from './create-patient.component';
import { Router } from '@angular/router';
import { PatientService, Patient } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';

describe('CreatePatientComponent', () => {
  let component: CreatePatientComponent;
  let fixture: ComponentFixture<CreatePatientComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    patientServiceSpy = jasmine.createSpyObj('PatientService', ['add']);

    await TestBed.configureTestingModule({
      imports: [CreatePatientComponent, FormsModule, CommonModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PatientService, useValue: patientServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form title', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Cadastrar Paciente');
  });

  it('should have empty initial formData', () => {
    expect(component.formData).toEqual({
      name: '',
      cpf: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
    });
  });

  it('should update formData when inputs change', () => {
    const inputs = {
      name: fixture.debugElement.query(By.css('input[name="name"]')).nativeElement as HTMLInputElement,
      cpf: fixture.debugElement.query(By.css('input[name="cpf"]')).nativeElement as HTMLInputElement,
      dateOfBirth: fixture.debugElement.query(By.css('input[name="dateOfBirth"]')).nativeElement as HTMLInputElement,
      gender: fixture.debugElement.query(By.css('select[name="gender"]')).nativeElement as HTMLSelectElement,
      phone: fixture.debugElement.query(By.css('input[name="phone"]')).nativeElement as HTMLInputElement,
      email: fixture.debugElement.query(By.css('input[name="email"]')).nativeElement as HTMLInputElement,
      address: fixture.debugElement.query(By.css('input[name="address"]')).nativeElement as HTMLInputElement,
    };

    inputs.name.value = 'João'; inputs.name.dispatchEvent(new Event('input'));
    inputs.cpf.value = '12345678900'; inputs.cpf.dispatchEvent(new Event('input'));
    inputs.dateOfBirth.value = '1990-01-01'; inputs.dateOfBirth.dispatchEvent(new Event('input'));
    inputs.gender.value = 'Masculino'; inputs.gender.dispatchEvent(new Event('change'));
    inputs.phone.value = '123456789'; inputs.phone.dispatchEvent(new Event('input'));
    inputs.email.value = 'joao@example.com'; inputs.email.dispatchEvent(new Event('input'));
    inputs.address.value = 'Rua ABC, 123'; inputs.address.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.formData).toEqual({
      name: 'João',
      cpf: '12345678900',
      dateOfBirth: '1990-01-01',
      gender: 'Masculino',
      phone: '123456789',
      email: 'joao@example.com',
      address: 'Rua ABC, 123',
    });
  });

  it('should call handleSubmit and add patient when form is submitted', () => {
    component.formData = {
      name: 'Maria',
      cpf: '11122233344',
      dateOfBirth: '1985-05-10',
      gender: 'Feminino',
      phone: '987654321',
      email: 'maria@test.com',
      address: 'Rua XYZ, 456',
    };

    const form = { invalid: false } as NgForm;

    component.handleSubmit(form);

    expect(patientServiceSpy.add).toHaveBeenCalledWith(component.formData as Patient);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should not add patient if form is invalid', () => {
    const form = { invalid: true } as NgForm;

    component.handleSubmit(form);

    expect(patientServiceSpy.add).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back on handleCancel', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
