// src/app/pages/patient/details/details-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPatientComponent } from './details-patient.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService, Patient } from '../../../services/patient.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DetailsPatientComponent', () => {
  let component: DetailsPatientComponent;
  let fixture: ComponentFixture<DetailsPatientComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockPatientService: jasmine.SpyObj<PatientService>;

  const patientMock: Patient = {
    id: 1,
    name: 'João Silva',
    dateOfBirth: '1990-05-10',
    gender: 'Masculino',
    cpf: '123.456.789-00',
    email: 'joao@example.com',
    phone: '123456789',
    address: 'Rua A, 123',
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockPatientService = jasmine.createSpyObj('PatientService', ['getById']);

    await TestBed.configureTestingModule({
      imports: [DetailsPatientComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PatientService, useValue: mockPatientService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPatientComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load patient on init', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    expect(mockPatientService.getById).toHaveBeenCalledWith(1);
    expect(component.patient).toEqual(patientMock);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('João Silva');
    expect(compiled.textContent).toContain('123.456.789-00');
  });

  it('should show loading template when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('p'));
    expect(loadingEl.nativeElement.textContent).toContain('Carregando paciente...');
  });

  it('should show noDataTemplate if patient is null after loading', () => {
    mockPatientService.getById.and.returnValue(of(null as any));
    fixture.detectChanges();

    const noDataEl = fixture.debugElement.query(By.css('p'));
    expect(noDataEl.nativeElement.textContent).toContain('Paciente não encontrado.');
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2025-08-21T00:00:00.000Z');
    const expected = new Date('2025-08-21T00:00:00.000Z').toLocaleDateString('pt-BR');
    expect(formatted).toBe(expected);
  });

  it('should navigate to edit page when goToEdit is called', () => {
    component.patient = patientMock;
    component.goToEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient/edit/1']);
  });

  it('should navigate back to patient list when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should call goToEdit on edit button click', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    const editBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    editBtn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient/edit/1']);
  });

  it('should call goBack on back button click', () => {
    mockPatientService.getById.and.returnValue(of(patientMock));
    fixture.detectChanges();

    const backBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    backBtn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
