// src/pages/Doctors/Create/create-doctor.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDoctorComponent, doctorsMock, Doctor } from './create-doctor.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('CreateDoctorComponent', () => {
  let component: CreateDoctorComponent;
  let fixture: ComponentFixture<CreateDoctorComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [CreateDoctorComponent, CommonModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Limpa mock antes de cada teste
    doctorsMock.length = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form values on handleChange for text inputs', () => {
    const input = { target: { name: 'name', value: 'Dr. Test' } } as any;
    component.handleChange(input);
    expect(component.form.name).toBe('Dr. Test');
  });

  it('should update form values on handleChange for checkbox', () => {
    const input = { target: { name: 'isActive', type: 'checkbox', checked: true } } as any;
    component.handleChange(input);
    expect(component.form.isActive).toBe(true);
  });

  it('should add new doctor on handleSubmit and navigate', () => {
    component.form = {
      id: 0,
      name: 'Dr. Test',
      crm: '12345',
      specialty: 'Cardiologia',
      email: 'test@med.com',
      phone: '999999999',
      isActive: true
    };

    component.handleSubmit();

    expect(doctorsMock.length).toBe(1);
    expect(doctorsMock[0].name).toBe('Dr. Test');
    expect(doctorsMock[0].id).toBe(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should navigate to /doctors on cancel', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should reflect form changes in the template', () => {
    component.form.name = 'Dr. Template';
    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    expect(nameInput.value).toBe('Dr. Template');
  });
});
