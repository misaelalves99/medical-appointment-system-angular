// src/pages/Appointment/Details/details-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsAppointmentComponent, Appointment } from './details-appointment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetailsAppointmentComponent', () => {
  let component: DetailsAppointmentComponent;
  let fixture: ComponentFixture<DetailsAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAppointment: Appointment = {
    id: 1,
    patientId: 101,
    patient: { fullName: 'João da Silva' },
    doctorId: 201,
    doctor: { fullName: 'Dra. Maria Oliveira' },
    appointmentDate: '2025-08-15T14:30',
    status: 'Confirmada', // string agora
    notes: 'Paciente apresentou melhora significativa.'
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DetailsAppointmentComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '1' } } // string segura
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsAppointmentComponent);
    component = fixture.componentInstance;

    // Substituir dados simulados do componente pelo mock
    component.appointment = mockAppointment;

    fixture.detectChanges();
  });

  it('should create the component and load appointment', () => {
    expect(component).toBeTruthy();
    expect(component.appointment).toEqual(mockAppointment);
  });

  it('should navigate to edit page when navigateToEdit is called', () => {
    component.navigateToEdit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments/edit/1']);
  });

  it('should navigate to appointments list when navigateToList is called', () => {
    component.navigateToList();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should render appointment details correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockAppointment.patient?.fullName || '');
    expect(compiled.textContent).toContain(mockAppointment.doctor?.fullName || '');
    expect(compiled.textContent).toContain(mockAppointment.status);
    expect(compiled.textContent).toContain(mockAppointment.notes || '');
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });

  it('should render correct date format', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dateElement = compiled.querySelector('.infoRow:nth-child(3) .infoValue');
    const expectedDate = new Date(mockAppointment.appointmentDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    expect(dateElement?.textContent).toContain(expectedDate);
  });

  it('should render correct time format', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const timeElement = compiled.querySelector('.infoRow:nth-child(3) .infoValue');
    const expectedTime = new Date(mockAppointment.appointmentDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    expect(timeElement?.textContent).toContain(expectedTime);
  });
});
