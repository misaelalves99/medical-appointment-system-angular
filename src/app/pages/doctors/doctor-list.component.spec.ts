// src/pages/Doctors/doctor-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorListComponent } from './doctor-list.component';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;
  let doctorServiceSpy: jasmine.SpyObj<DoctorService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockDoctors = [
    { id: 1, name: 'Dr. A', crm: '123', specialty: 'Cardio', email: 'a@test.com', phone: '1111', isActive: true },
    { id: 2, name: 'Dr. B', crm: '456', specialty: 'Neuro', email: 'b@test.com', phone: '2222', isActive: false }
  ];

  beforeEach(async () => {
    doctorServiceSpy = jasmine.createSpyObj('DoctorService', ['getDoctors']);
    doctorServiceSpy.getDoctors.and.returnValue(of(mockDoctors));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DoctorListComponent, CommonModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: DoctorService, useValue: doctorServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load doctors on init', () => {
    expect(component.doctors.length).toBe(2);
    expect(component.doctors).toEqual(mockDoctors);
  });

  it('should filter doctors by search term', () => {
    component.search = 'Dr. A';
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].name).toBe('Dr. A');

    component.search = 'Neuro';
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].specialty).toBe('Neuro');

    component.search = '9999';
    expect(component.filteredDoctors.length).toBe(0);
  });

  it('should navigate to create', () => {
    component.goToCreate();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/create']);
  });

  it('should navigate to details', () => {
    component.goToDetails(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/details/1']);
  });

  it('should navigate to edit', () => {
    component.goToEdit(2);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/edit/2']);
  });

  it('should navigate to delete', () => {
    component.goToDelete(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/delete/1']);
  });
});
