// src/pages/Doctors/Details/doctor-details.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorDetailsComponent, Doctor } from './doctor-details.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('DoctorDetailsComponent', () => {
  let component: DoctorDetailsComponent;
  let fixture: ComponentFixture<DoctorDetailsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockDoctor: Doctor = {
    id: 1,
    name: 'Dr. Test',
    crm: '12345',
    specialty: 'Cardiologia',
    email: 'test@med.com',
    phone: '999999999',
    isActive: true,
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DoctorDetailsComponent, CommonModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorDetailsComponent);
    component = fixture.componentInstance;
    component.doctor = mockDoctor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render doctor details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain(mockDoctor.name);
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain(mockDoctor.crm);
    expect(compiled.querySelector('p:nth-of-type(3)')?.textContent).toContain(mockDoctor.specialty);
    expect(compiled.querySelector('p:nth-of-type(4)')?.textContent).toContain(mockDoctor.email);
    expect(compiled.querySelector('p:nth-of-type(5)')?.textContent).toContain(mockDoctor.phone);
    expect(compiled.querySelector('p:nth-of-type(6)')?.textContent).toContain('Sim');
  });

  it('should navigate to edit when Edit button is clicked', () => {
    const editBtn = fixture.debugElement.query(By.css('button.edit'));
    editBtn.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/doctors/edit/${mockDoctor.id}`]);
  });

  it('should navigate back when Back button is clicked', () => {
    const backBtn = fixture.debugElement.query(By.css('button.back'));
    backBtn.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should not render content if doctor is undefined', () => {
    component.doctor = undefined!;
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.container'));
    expect(container).toBeNull();
  });
});
