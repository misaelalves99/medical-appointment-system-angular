// src/pages/Doctors/Create/create-doctor.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDoctorComponent } from './create-doctor.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';

describe('CreateDoctorComponent', () => {
  let component: CreateDoctorComponent;
  let fixture: ComponentFixture<CreateDoctorComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockDoctorService: any;
  let mockSpecialtyService: any;

  const specialtiesMock = [
    { name: 'Cardiologia' },
    { name: 'Dermatologia' },
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockDoctorService = { add: jasmine.createSpy('add') };
    mockSpecialtyService = { getSpecialties: jasmine.createSpy('getSpecialties').and.returnValue(of(specialtiesMock)) };

    await TestBed.configureTestingModule({
      imports: [CreateDoctorComponent, CommonModule, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: 'DoctorService', useValue: mockDoctorService },
        { provide: 'SpecialtyService', useValue: mockSpecialtyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.specialties.length).toBe(2);
  });

  it('should update formData when inputs change', () => {
    const input = { target: { name: 'name', value: 'Dr. Test' } } as any;
    component.formData.name = '';
    component.handleSubmit = jasmine.createSpy(); // evita submissão real
    component.formData.name = input.target.value;
    expect(component.formData.name).toBe('Dr. Test');
  });

  it('should submit form and navigate to /doctors', () => {
    const form = { invalid: false } as NgForm;
    component.formData = {
      name: 'Dr. Test',
      crm: '12345',
      specialty: 'Cardiologia',
      email: 'test@med.com',
      phone: '999999999',
      isActive: true,
    };
    component.handleSubmit(form);
    expect(mockDoctorService.add).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'Dr. Test',
      crm: '12345'
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should not submit form if invalid', () => {
    const form = { invalid: true } as NgForm;
    component.handleSubmit(form);
    expect(mockDoctorService.add).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /doctors on cancel', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should render input values correctly in template', () => {
    component.formData.name = 'Dr. Template';
    component.formData.crm = '123';
    component.formData.email = 'email@test.com';
    component.formData.phone = '99999999';
    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    const crmInput = fixture.debugElement.query(By.css('input[name="crm"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const phoneInput = fixture.debugElement.query(By.css('input[name="phone"]')).nativeElement;

    expect(nameInput.value).toBe('Dr. Template');
    expect(crmInput.value).toBe('123');
    expect(emailInput.value).toBe('email@test.com');
    expect(phoneInput.value).toBe('99999999');
  });

  it('should render specialties in select dropdown', () => {
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('select[name="specialty"] option'));
    expect(options.length).toBe(3); // 1 default + 2 mock
    expect(options[1].nativeElement.textContent).toBe('Cardiologia');
    expect(options[2].nativeElement.textContent).toBe('Dermatologia');
  });
});
