// src/pages/Appointment/Details/details-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsAppointmentComponent } from './details-appointment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DetailsAppointmentComponent', () => {
  let component: DetailsAppointmentComponent;
  let fixture: ComponentFixture<DetailsAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DetailsAppointmentComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.appointment.id).toBe(1);
  });

  it('should navigate to edit page when navigateToEdit is called', () => {
    component.navigateToEdit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments/edit/1']);
  });

  it('should navigate to appointments list when navigateToList is called', () => {
    component.navigateToList();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should render appointment details correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.infoValue')?.textContent).toContain('João da Silva');
    expect(compiled.textContent).toContain('Dra. Maria Oliveira');
    expect(compiled.textContent).toContain('Confirmada');
    expect(compiled.textContent).toContain('Paciente apresentou melhora significativa.');
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });

  it('should render correct date format', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dateElement = compiled.querySelector('.infoRow:nth-child(3) .infoValue');
    expect(dateElement?.textContent).toContain('15/08/2025'); // formato pt-BR curto
  });
});
