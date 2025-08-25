// src/pages/appointments/delete/delete-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAppointmentComponent } from './delete-appointment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppointmentService } from '../../../services/appointment.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('DeleteAppointmentComponent', () => {
  let component: DeleteAppointmentComponent;
  let fixture: ComponentFixture<DeleteAppointmentComponent>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAppointment = {
    id: 1,
    patientId: 101,
    patientName: 'Alice',
    doctorId: 201,
    doctorName: 'Dr. John',
    appointmentDate: '2025-08-21T10:00',
    status: 0, // Scheduled
  };

  beforeEach(async () => {
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['getById', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DeleteAppointmentComponent, FormsModule],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { 
          provide: Router, 
          useValue: routerSpy 
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAppointmentComponent);
    component = fixture.componentInstance;
    appointmentServiceSpy.getById.and.returnValue(of(mockAppointment));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load appointment on ngOnInit', () => {
    expect(component.appointment).toEqual(mockAppointment);
    expect(appointmentServiceSpy.getById).toHaveBeenCalledWith(1);
  });

  it('should return correct status label', () => {
    expect(component.getStatusLabel(0)).toBe('Agendada'); // Scheduled
    expect(component.getStatusLabel(1)).toBe('Confirmada'); // Confirmed
    expect(component.getStatusLabel(2)).toBe('Cancelada'); // Cancelled
    expect(component.getStatusLabel(3)).toBe('Concluída'); // Completed
    expect(component.getStatusLabel(undefined)).toBe('Desconhecido');
  });

  it('should call delete and navigate when handleSubmit is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.handleSubmit();
    expect(appointmentServiceSpy.delete).toHaveBeenCalledWith(mockAppointment.id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should not delete when handleSubmit is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.handleSubmit();
    expect(appointmentServiceSpy.delete).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to appointments on cancel button click', () => {
    const button = fixture.debugElement.query(By.css('button.btnSecondary'));
    button.nativeElement.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should render appointment details in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alice');
    expect(compiled.textContent).toContain('Dr. John');
    expect(compiled.textContent).toContain('21/08/2025'); // formatted date
    expect(compiled.textContent).toContain('Agendada'); // status label
  });
});
