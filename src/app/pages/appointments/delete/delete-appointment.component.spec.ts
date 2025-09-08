// src/app/pages/appointments/delete/delete-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAppointmentComponent } from './delete-appointment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../services/appointment.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DeleteAppointmentComponent', () => {
  let component: DeleteAppointmentComponent;
  let fixture: ComponentFixture<DeleteAppointmentComponent>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAppointment: Appointment = {
    id: 1,
    patientId: 101,
    patientName: 'Alice',
    doctorId: 201,
    doctorName: 'Dr. John',
    appointmentDate: '2025-08-21T10:00',
    status: AppointmentStatus.Scheduled,
    notes: 'Observação teste'
  };

  function setupTestBed(routeId: string | null, appointments: Appointment[] = [mockAppointment]) {
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['getAppointments', 'delete']);
    appointmentServiceSpy.getAppointments.and.returnValue(of(appointments));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [DeleteAppointmentComponent],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => routeId } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('default case with valid appointment', () => {
    beforeEach(() => setupTestBed('1'));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load appointment on ngOnInit', () => {
      expect(component.appointment).toEqual(mockAppointment);
    });

    it('should format date and time correctly', () => {
      expect(component.formattedDate).toBe(new Date(mockAppointment.appointmentDate).toLocaleDateString());
      expect(component.formattedTime).toBe(
        new Date(mockAppointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    });

    it('should delete appointment and navigate when handleDelete is called', () => {
      component.handleDelete();
      expect(appointmentServiceSpy.delete).toHaveBeenCalledWith(mockAppointment.id);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
    });

    it('should navigate on handleCancel', () => {
      component.handleCancel();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
    });

    it('should render appointment details in template', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Alice');
      expect(compiled.textContent).toContain('Dr. John');
      expect(compiled.textContent).toContain(component.formattedDate);
      expect(compiled.textContent).toContain(component.formattedTime);
    });

    it('should call handleDelete when form is submitted', () => {
      spyOn(component, 'handleDelete');
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', {});
      expect(component.handleDelete).toHaveBeenCalled();
    });

    it('should call handleCancel when cancel button is clicked', () => {
      spyOn(component, 'handleCancel');
      const cancelButton = fixture.debugElement.query(By.css('button.cancelButton'));
      cancelButton.nativeElement.click();
      expect(component.handleCancel).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should redirect if id param is null', () => {
      setupTestBed(null);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
    });

    it('should redirect if appointment not found', () => {
      setupTestBed('99', []); // id válido mas lista vazia
      expect(component.appointment).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
    });

    it('should display "not found" template if appointment is null', () => {
      setupTestBed('99', []);
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Agendamento não encontrado');
    });
  });
});
