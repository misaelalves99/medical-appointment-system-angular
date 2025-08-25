// src/pages/patient/delete/delete-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePatientComponent } from './delete-patient.component';
import { PatientService, Patient } from '../../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DeletePatientComponent', () => {
  let component: DeletePatientComponent;
  let fixture: ComponentFixture<DeletePatientComponent>;
  let mockPatientService: any;
  let mockRouter: any;

  // ⚡ Mock completo compatível com Patient
  const patientMock: Patient = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    dateOfBirth: '1990-01-01',
    email: 'joao@email.com',
    phone: '999999999',
    address: 'Rua Teste, 123',
    gender: 'Masculino'
  };

  beforeEach(async () => {
    mockPatientService = {
      getById: jasmine.createSpy('getById').and.returnValue(of(patientMock)),
      delete: jasmine.createSpy('delete')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [DeletePatientComponent],
      providers: [
        { provide: PatientService, useValue: mockPatientService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load patient on init', () => {
    expect(mockPatientService.getById).toHaveBeenCalledWith(1);
    expect(component.patient).toEqual(patientMock);

    const nameEl = fixture.debugElement.query(By.css('strong')).nativeElement;
    expect(nameEl.textContent).toContain('João Silva');
  });

  it('should navigate to /patient when cancel is clicked', () => {
    component.handleCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should call delete and navigate if confirm is true', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.handleSubmit();

    expect(mockPatientService.delete).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should not call delete or navigate if confirm is false', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.handleSubmit();

    expect(mockPatientService.delete).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
