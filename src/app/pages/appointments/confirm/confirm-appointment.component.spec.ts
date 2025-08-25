// src/app/pages/appointment/confirm/confirm-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmAppointmentComponent, Appointment } from './confirm-appointment.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ConfirmAppointmentComponent', () => {
  let component: ConfirmAppointmentComponent;
  let fixture: ComponentFixture<ConfirmAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAppointment: Appointment = {
    id: 1,
    appointmentDate: '2025-08-21T10:30:00',
    patient: { fullName: 'Alice' },
    patientId: 1,
    doctor: { fullName: 'Dr. Bob' },
    doctorId: 2
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ConfirmAppointmentComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmAppointmentComponent);
    component = fixture.componentInstance;
    component.appointment = mockAppointment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event with appointment id', () => {
    spyOn(component.confirm, 'emit');

    const event = new Event('submit');
    component.handleConfirm(event);

    expect(component.confirm.emit).toHaveBeenCalledWith(mockAppointment.id);
  });

  it('should prevent default event when confirming', () => {
    const event = jasmine.createSpyObj('event', ['preventDefault']);
    component.handleConfirm(event as any);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should navigate back when handleBack is called', () => {
    component.handleBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should render appointment details in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alice');
    expect(compiled.textContent).toContain('Dr. Bob');
    expect(compiled.textContent).toContain('Confirmar Consulta');
  });

  it('should call handleConfirm when form is submitted', () => {
    spyOn(component, 'handleConfirm');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', new Event('submit'));
    expect(component.handleConfirm).toHaveBeenCalled();
  });

  it('should call handleBack when cancel button is clicked', () => {
    spyOn(component, 'handleBack');
    const button = fixture.debugElement.query(By.css('.backLink'));
    button.nativeElement.click();
    expect(component.handleBack).toHaveBeenCalled();
  });
});
