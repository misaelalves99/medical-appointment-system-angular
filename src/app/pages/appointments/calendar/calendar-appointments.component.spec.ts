// src/app/pages/appointments/calendar/calendar-appointments.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarAppointmentsComponent } from './calendar-appointments.component';
import { By } from '@angular/platform-browser';
import { Appointment, AppointmentStatus } from '../../../types/appointment.model';

describe('CalendarAppointmentsComponent', () => {
  let component: CalendarAppointmentsComponent;
  let fixture: ComponentFixture<CalendarAppointmentsComponent>;

  const mockAppointments: Appointment[] = [
    { id: 2, patientId: 1, doctorId: 2, appointmentDate: '2025-08-22T14:00:00', status: AppointmentStatus.Confirmed, patientName: 'Alice', doctorName: 'Dr. Bob' },
    { id: 1, patientId: 2, doctorId: 1, appointmentDate: '2025-08-21T10:00:00', status: AppointmentStatus.Scheduled, patientName: 'John', doctorName: 'Dr. Smith' },
    { id: 3, patientId: 3, doctorId: 3, appointmentDate: '2025-08-23T09:00:00', status: AppointmentStatus.Cancelled } // sem nomes
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarAppointmentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarAppointmentsComponent);
    component = fixture.componentInstance;
    component.appointments = [...mockAppointments];
    component.onBack = jasmine.createSpy('onBack');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort appointments by date', () => {
    const sorted = component.sortedAppointments;
    expect(sorted[0].id).toBe(1);
    expect(sorted[1].id).toBe(2);
    expect(sorted[2].id).toBe(3);
  });

  it('should correctly map status to string', () => {
    expect(component.statusToString(AppointmentStatus.Scheduled)).toBe('Agendada');
    expect(component.statusToString(AppointmentStatus.Confirmed)).toBe('Confirmada');
    expect(component.statusToString(AppointmentStatus.Cancelled)).toBe('Cancelada');
    expect(component.statusToString(AppointmentStatus.Completed)).toBe('Concluída');
    expect(component.statusToString('unknown' as any)).toBe('Desconhecido');
  });

  it('should render appointments in table including fallback IDs', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
    // Pacientes e médicos com nome
    expect(rows[0].nativeElement.textContent).toContain('21/08/2025');
    expect(rows[0].nativeElement.textContent).toContain('John');
    expect(rows[0].nativeElement.textContent).toContain('Dr. Smith');
    // Paciente/médico sem nome
    expect(rows[2].nativeElement.textContent).toContain('23/08/2025');
    expect(rows[2].nativeElement.textContent).toContain('ID 3');
  });

  it('should call onBack when back button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.backLink'));
    button.nativeElement.click();
    expect(component.onBack).toHaveBeenCalled();
  });

  it('should handle empty appointments array', () => {
    component.appointments = [];
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });
});
