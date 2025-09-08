// src/app/pages/doctors/edit/doctor-edit.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorEditComponent } from './doctor-edit.component';
import { Doctor } from '../../../types/doctor.model';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('DoctorEditComponent', () => {
  let component: DoctorEditComponent;
  let fixture: ComponentFixture<DoctorEditComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockDoctor: Doctor = {
    id: 1,
    name: 'Dr. Test',
    crm: '12345',
    specialty: 'Cardiologia',
    email: 'test@med.com',
    phone: '999999999',
    isActive: true,
  };

  const specialtiesMock = [
    { name: 'Cardiologia' },
    { name: 'Dermatologia' },
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DoctorEditComponent, CommonModule, FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorEditComponent);
    component = fixture.componentInstance;

    // Simula carregamento do médico e especialidades
    component.form = { ...mockDoctor };
    component.specialties = [...specialtiesMock];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with doctor data', () => {
    expect(component.form).toEqual(mockDoctor);
  });

  it('should render form fields with initial values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect((compiled.querySelector('input[name="name"]') as HTMLInputElement).value).toBe(mockDoctor.name);
    expect((compiled.querySelector('input[name="crm"]') as HTMLInputElement).value).toBe(mockDoctor.crm);
    expect((compiled.querySelector('select[name="specialty"]') as HTMLSelectElement).value).toBe(mockDoctor.specialty);
    expect((compiled.querySelector('input[name="email"]') as HTMLInputElement).value).toBe(mockDoctor.email);
    expect((compiled.querySelector('input[name="phone"]') as HTMLInputElement).value).toBe(mockDoctor.phone);
    expect((compiled.querySelector('input[name="isActive"]') as HTMLInputElement).checked).toBeTrue();
  });

  it('should update form when input values change', () => {
    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement as HTMLInputElement;
    nameInput.value = 'Dr. Updated';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form!.name).toBe('Dr. Updated');

    const activeCheckbox = fixture.debugElement.query(By.css('input[name="isActive"]')).nativeElement as HTMLInputElement;
    activeCheckbox.checked = false;
    activeCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.form!.isActive).toBeFalse();
  });

  it('should navigate to /doctors onSave', () => {
    spyOn(component['doctorService'], 'update').and.callFake(() => {});
    component.onSave();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should navigate to /doctors onCancel', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should render specialties in select dropdown', () => {
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('select[name="specialty"] option'));
    expect(options.length).toBe(3); // 1 default + 2 mock
    expect(options[1].nativeElement.textContent).toBe('Cardiologia');
    expect(options[2].nativeElement.textContent).toBe('Dermatologia');
  });
});
