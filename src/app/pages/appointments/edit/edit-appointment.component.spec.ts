// src/pages/Appointments/Edit/edit-appointment.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentComponent } from './edit-appointment.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('EditAppointmentComponent', () => {
  let component: EditAppointmentComponent;
  let fixture: ComponentFixture<EditAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditAppointmentComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with default form values', () => {
    expect(component).toBeTruthy();
    expect(component.formData.status).toBe('Confirmada');
    expect(component.formData.patientId).toBe('');
  });

  it('should update formData when handleChange is called', () => {
    const event = {
      target: { name: 'patientId', value: '2' }
    } as unknown as Event;

    component.handleChange(event);
    expect(component.formData.patientId).toBe('2');
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit').and.callThrough();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should navigate to list when navigateToList is called', () => {
    component.navigateToList();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should update multiple fields via handleChange', () => {
    const patientEvent = { target: { name: 'patientId', value: '1' } } as any;
    const doctorEvent = { target: { name: 'doctorId', value: '2' } } as any;
    const statusEvent = { target: { name: 'status', value: 'Cancelada' } } as any;

    component.handleChange(patientEvent);
    component.handleChange(doctorEvent);
    component.handleChange(statusEvent);

    expect(component.formData.patientId).toBe('1');
    expect(component.formData.doctorId).toBe('2');
    expect(component.formData.status).toBe('Cancelada');
  });
});
