// src/pages/Patient/Create/create-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CreatePatientComponent } from './create-patient.component';

describe('CreatePatientComponent', () => {
  let component: CreatePatientComponent;
  let fixture: ComponentFixture<CreatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePatientComponent, FormsModule],
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

  it('should have empty initial form data', () => {
    expect(component.formData).toEqual({
      name: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: ''
    });
  });

  it('should update formData when inputs change', () => {
    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    const dateInput = fixture.debugElement.query(By.css('input[name="dateOfBirth"]')).nativeElement;
    const genderSelect = fixture.debugElement.query(By.css('select[name="gender"]')).nativeElement;
    const phoneInput = fixture.debugElement.query(By.css('input[name="phone"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;

    nameInput.value = 'João';
    nameInput.dispatchEvent(new Event('input'));

    dateInput.value = '1990-01-01';
    dateInput.dispatchEvent(new Event('input'));

    genderSelect.value = 'Masculino';
    genderSelect.dispatchEvent(new Event('change'));

    phoneInput.value = '123456789';
    phoneInput.dispatchEvent(new Event('input'));

    emailInput.value = 'joao@example.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.formData).toEqual({
      name: 'João',
      dateOfBirth: '1990-01-01',
      gender: 'Masculino',
      phone: '123456789',
      email: 'joao@example.com'
    });
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit');

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.handleSubmit).toHaveBeenCalled();
  });
});
