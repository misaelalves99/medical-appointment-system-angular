// src/app/pages/patient/edit/edit-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPatientComponent } from './edit-patient.component';
import { PatientService, Patient } from '../../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EditPatientComponent', () => {
  let component: EditPatientComponent;
  let fixture: ComponentFixture<EditPatientComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockPatientService: jasmine.SpyObj<PatientService>;

  const patientMock: Patient = {
    id: 1,
    name: 'Maria Silva',
    cpf: '12345678900',
    dateOfBirth: '1990-01-01',
    email: 'maria@example.com',
    phone: '987654321',
    address: 'Rua A, 123',
    gender: 'Feminino',
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockPatientService = jasmine.createSpyObj('PatientService', [
      'getById',
      'update',
    ]);

    await TestBed.configureTestingModule({
      imports: [EditPatientComponent, FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PatientService, useValue: mockPatientService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPatientComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load patient on init and populate formData', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    expect(mockPatientService.getById).toHaveBeenCalledWith(1);
    expect(component.existingPatient).toEqual(patientMock);
    expect(component.formData).toEqual(patientMock);

    const inputName = fixture.debugElement.query(
      By.css('input[name="name"]')
    ).nativeElement;
    expect(inputName.value).toBe('Maria Silva');
  });

  it('should redirect to /patient if patient not found', () => {
    mockPatientService.getById.and.returnValue(of(null as any));
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should call update and navigate on handleSubmit with valid form', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    const form = {
      invalid: false,
    } as NgForm;

    component.handleSubmit(form);
    expect(mockPatientService.update).toHaveBeenCalledWith(patientMock);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should not call update if form is invalid', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    const form = { invalid: true } as NgForm;
    component.handleSubmit(form);

    expect(mockPatientService.update).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back when handleCancel is called', () => {
    component.handleCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should trigger handleSubmit on form submit', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    spyOn(component, 'handleSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should trigger handleCancel on back button click', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    const backBtn = fixture.debugElement.query(By.css('button.back'));
    backBtn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
