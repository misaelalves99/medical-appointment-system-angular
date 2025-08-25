// src/app/pages/appointments/create/create-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAppointmentComponent } from './create-appointment.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateAppointmentComponent', () => {
  let component: CreateAppointmentComponent;
  let fixture: ComponentFixture<CreateAppointmentComponent>;

  const patientsMock = [
    { value: '1', label: 'Alice' },
    { value: '2', label: 'Bob' }
  ];

  const doctorsMock = [
    { value: '10', label: 'Dr. John' },
    { value: '11', label: 'Dr. Jane' }
  ];

  const statusMock = [
    { value: 'scheduled', label: 'Agendada' },
    { value: 'confirmed', label: 'Confirmada' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAppointmentComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentComponent);
    component = fixture.componentInstance;
    component.patients = patientsMock;
    component.doctors = doctorsMock;
    component.statusOptions = statusMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formData on handleSubmit', () => {
    spyOn(component.onSubmit, 'emit');
    component.formData = {
      patientId: '1',
      doctorId: '10',
      appointmentDate: '2025-08-21T10:30',
      status: 'scheduled',
      notes: 'Observação teste'
    };

    component.handleSubmit();

    expect(component.onSubmit.emit).toHaveBeenCalledWith(component.formData);
  });

  it('should emit event on handleCancel', () => {
    spyOn(component.onCancel, 'emit');
    component.handleCancel();
    expect(component.onCancel.emit).toHaveBeenCalled();
  });

  it('should render patients, doctors, and status options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const patientOptions = compiled.querySelectorAll('#patientId option');
    const doctorOptions = compiled.querySelectorAll('#doctorId option');
    const statusOptions = compiled.querySelectorAll('#status option');

    // includes placeholder option + 2 mock options
    expect(patientOptions.length).toBe(3);
    expect(patientOptions[1].textContent).toContain('Alice');

    expect(doctorOptions.length).toBe(3);
    expect(doctorOptions[1].textContent).toContain('Dr. John');

    expect(statusOptions.length).toBe(3);
    expect(statusOptions[1].textContent).toContain('Agendada');
  });

  it('should call handleSubmit on form submit', () => {
    spyOn(component, 'handleSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should call handleCancel on cancel button click', () => {
    spyOn(component, 'handleCancel');
    const button = fixture.debugElement.query(By.css('button.btn-secondary'));
    button.nativeElement.click();
    expect(component.handleCancel).toHaveBeenCalled();
  });
});
