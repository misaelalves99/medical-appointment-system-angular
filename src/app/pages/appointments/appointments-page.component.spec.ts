// src/app/pages/appointments/appointments-page.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentListComponent } from './appointments-page.component';
import { AppointmentService, Appointment, AppointmentStatus } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppointmentListComponent', () => {
  let component: AppointmentListComponent;
  let fixture: ComponentFixture<AppointmentListComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let appointmentsSubject: BehaviorSubject<Appointment[]>;

  const mockAppointments: Appointment[] = [
    { id: 1, patientId: 101, doctorId: 201, appointmentDate: '2025-08-21T10:00', status: AppointmentStatus.Scheduled, patientName: 'Alice' },
    { id: 2, patientId: 102, doctorId: 202, appointmentDate: '2025-08-21T12:00', status: AppointmentStatus.Confirmed, patientName: 'Bob' },
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    appointmentsSubject = new BehaviorSubject<Appointment[]>(mockAppointments);
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['delete'], { appointments$: appointmentsSubject.asObservable() });

    await TestBed.configureTestingModule({
      imports: [AppointmentListComponent, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and load appointments', () => {
    expect(component).toBeTruthy();
    expect(component.appointments.length).toBe(2);
    expect(component.filteredAppointments.length).toBe(2);
  });

  it('should filter appointments by patientId', () => {
    component.search = '101';
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(1);
    expect(component.filteredAppointments[0].patientId).toBe(101);
  });

  it('should filter appointments by status', () => {
    component.search = 'confirmada';
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(1);
    expect(component.filteredAppointments[0].status).toBe(AppointmentStatus.Confirmed);
  });

  it('should filter appointments by date', () => {
    const dateStr = new Date('2025-08-21T10:00').toLocaleDateString();
    component.search = dateStr;
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(2);
  });

  it('should filter appointments by time', () => {
    const timeStr = new Date('2025-08-21T12:00').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    component.search = timeStr;
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(1);
    expect(component.filteredAppointments[0].id).toBe(2);
  });

  it('should return correct status label', () => {
    expect(component.getStatusLabel(AppointmentStatus.Pending)).toBe('Pendente');
    expect(component.getStatusLabel(AppointmentStatus.Scheduled)).toBe('Agendada');
    expect(component.getStatusLabel(AppointmentStatus.Confirmed)).toBe('Confirmada');
    expect(component.getStatusLabel(AppointmentStatus.Cancelled)).toBe('Cancelada');
    expect(component.getStatusLabel(AppointmentStatus.Completed)).toBe('Concluída');
  });

  it('should navigate to given path', () => {
    component.navigateTo('/appointments/create');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments/create']);
  });

  it('should delete appointment if confirm returns true', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteAppointment(1);
    expect(appointmentServiceSpy.delete).toHaveBeenCalledWith(1);
  });

  it('should not delete appointment if confirm returns false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteAppointment(1);
    expect(appointmentServiceSpy.delete).not.toHaveBeenCalled();
  });

  it('should render table rows and buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstRow = rows[0];
    expect(firstRow.textContent).toContain('1');
    expect(firstRow.textContent).toContain('Alice');

    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should show noResults row if filteredAppointments is empty', () => {
    component.search = 'nomatch';
    component.updateFilteredAppointments();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noResultsRow = compiled.querySelector('tbody tr .noResults');
    expect(noResultsRow).toBeTruthy();
    expect(noResultsRow?.textContent).toContain('Nenhuma consulta encontrada.');
  });

  it('should show no appointments message if appointments array is empty', () => {
    appointmentsSubject.next([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noAppointments = compiled.querySelector('.noResults');
    expect(noAppointments).toBeTruthy();
    expect(noAppointments?.textContent).toContain('Nenhuma consulta cadastrada.');
  });
});
