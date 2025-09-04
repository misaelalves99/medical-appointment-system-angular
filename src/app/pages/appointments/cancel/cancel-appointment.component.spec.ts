import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelAppointmentComponent } from './cancel-appointment.component';
import { By } from '@angular/platform-browser';

describe('CancelAppointmentComponent', () => {
  let component: CancelAppointmentComponent;
  let fixture: ComponentFixture<CancelAppointmentComponent>;

  const mockAppointment = {
    id: 1,
    appointmentDate: '2025-08-21T10:30:00',
    patient: { id: 1, fullName: 'Alice' },
    patientId: 1,
    doctor: { id: 2, fullName: 'Dr. Bob' },
    doctorId: 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelAppointmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelAppointmentComponent);
    component = fixture.componentInstance;
    component.appointment = mockAppointment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2025-08-21T10:30:00');
    expect(formatted).toContain('21/08/2025');
  });

  it('should emit cancelEvent with appointment id', () => {
    spyOn(component.cancelEvent, 'emit');
    component.handleCancel();
    expect(component.cancelEvent.emit).toHaveBeenCalledWith(mockAppointment.id);
  });

  it('should emit backEvent when handleBack is called', () => {
    spyOn(component.backEvent, 'emit');
    component.handleBack();
    expect(component.backEvent.emit).toHaveBeenCalled();
  });

  it('should render appointment details in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alice');
    expect(compiled.textContent).toContain('Dr. Bob');
    expect(compiled.textContent).toContain('Cancelar Consulta');
  });

  it('should call handleCancel when confirm button is clicked', () => {
    spyOn(component, 'handleCancel');
    const button = fixture.debugElement.query(By.css('.btnDanger'));
    button.nativeElement.click();
    expect(component.handleCancel).toHaveBeenCalled();
  });

  it('should call handleBack when back button is clicked', () => {
    spyOn(component, 'handleBack');
    const button = fixture.debugElement.query(By.css('.backLink'));
    button.nativeElement.click();
    expect(component.handleBack).toHaveBeenCalled();
  });

  it('should display IDs if patient or doctor name is missing', () => {
    component.appointment = {
      id: 2,
      appointmentDate: '2025-08-22T10:00:00',
      patientId: 10,
      doctorId: 20
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ID 10');
    expect(compiled.textContent).toContain('ID 20');
  });

  it('should not render template if appointment is undefined', () => {
    component.appointment = undefined as any;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cancelContainer')).toBeNull();
  });
});
