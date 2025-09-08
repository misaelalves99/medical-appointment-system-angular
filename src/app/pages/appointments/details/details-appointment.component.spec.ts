// src/pages/Appointment/Details/details-appointment.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsAppointmentComponent } from './details-appointment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../services/appointment.service';

describe('DetailsAppointmentComponent', () => {
  let component: DetailsAppointmentComponent;
  let fixture: ComponentFixture<DetailsAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let appointmentsSubject: BehaviorSubject<Appointment[]>;

  const mockAppointment: Appointment = {
    id: 1,
    patientId: 101,
    doctorId: 201,
    appointmentDate: '2025-08-15T14:30',
    status: AppointmentStatus.Confirmed,
    notes: 'Paciente apresentou melhora significativa.'
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    appointmentsSubject = new BehaviorSubject<Appointment[]>([mockAppointment]);

    const appointmentServiceStub = {
      appointments$: appointmentsSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [DetailsAppointmentComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: AppointmentService, useValue: appointmentServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.appointment).toEqual(mockAppointment);
  });

  it('should render appointment details correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('ID 101'); // fallback para paciente
    expect(compiled.textContent).toContain('ID 201'); // fallback para médico
    expect(compiled.textContent).toContain(mockAppointment.status);
    expect(compiled.textContent).toContain(mockAppointment.notes || '');
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });

  it('should render formatted date correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dateElement = compiled.querySelector('.infoRow:nth-child(3) .infoValue');
    const expectedDate = new Date(mockAppointment.appointmentDate).toLocaleDateString('pt-BR');
    expect(dateElement?.textContent).toContain(expectedDate);
  });

  it('should render formatted time correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const timeElement = compiled.querySelector('.infoRow:nth-child(4) .infoValue');
    const expectedTime = new Date(mockAppointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    expect(timeElement?.textContent).toContain(expectedTime);
  });

  it('should navigate to edit page', () => {
    component.navigateToEdit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments/edit/1']);
  });

  it('should navigate to appointments list', () => {
    component.navigateToList();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should navigate away if appointment not found', () => {
    appointmentsSubject.next([]);
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should display notFound template when appointment is null', () => {
    component.appointment = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Agendamento não encontrado.');
  });
});
