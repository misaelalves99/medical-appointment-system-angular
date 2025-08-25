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
    { id: 1, patientId: 2, doctorId: 1, appointmentDate: '2025-08-21T10:00:00', status: AppointmentStatus.Scheduled, patientName: 'John', doctorName: 'Dr. Smith' }
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
  });

  it('should correctly map status to string', () => {
    expect(component.statusToString(AppointmentStatus.Scheduled)).toBe('Agendada');
    expect(component.statusToString(AppointmentStatus.Confirmed)).toBe('Confirmada');
    expect(component.statusToString(AppointmentStatus.Cancelled)).toBe('Cancelada');
    expect(component.statusToString(AppointmentStatus.Completed)).toBe('Concluída');
    expect(component.statusToString('unknown' as any)).toBe('Desconhecido');
  });

  it('should render appointments in table', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('21/08/2025');
    expect(rows[0].nativeElement.textContent).toContain('John');
    expect(rows[1].nativeElement.textContent).toContain('22/08/2025');
    expect(rows[1].nativeElement.textContent).toContain('Alice');
  });

  it('should call onBack when back button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.backLink'));
    button.nativeElement.click();
    expect(component.onBack).toHaveBeenCalled();
  });
});
