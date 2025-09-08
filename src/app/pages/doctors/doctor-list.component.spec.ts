// src/pages/Doctors/doctor-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorListComponent } from './doctor-list.component';
import { DoctorService, Doctor } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;
  let doctorServiceSpy: jasmine.SpyObj<DoctorService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockDoctors: Doctor[] = [
    { id: 1, name: 'Dr. A', crm: '123', specialty: 'Cardio', email: 'a@test.com', phone: '1111', isActive: true },
    { id: 2, name: 'Dr. B', crm: '456', specialty: 'Neuro', email: 'b@test.com', phone: '2222', isActive: false }
  ];

  beforeEach(async () => {
    const doctors$ = new BehaviorSubject<Doctor[]>(mockDoctors);
    doctorServiceSpy = jasmine.createSpyObj('DoctorService', [], { doctors$: doctors$.asObservable() });

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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load doctors and initialize filteredDoctors', () => {
    expect(component.doctors.length).toBe(2);
    expect(component.filteredDoctors.length).toBe(2);
  });

  it('should filter doctors by search term', () => {
    component.search = 'Dr. A';
    component.updateFilteredDoctors();
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].name).toBe('Dr. A');

    component.search = 'Neuro';
    component.updateFilteredDoctors();
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].specialty).toBe('Neuro');

    component.search = '1';
    component.updateFilteredDoctors();
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].id).toBe(1);

    component.search = 'sim';
    component.updateFilteredDoctors();
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].isActive).toBeTrue();

    component.search = 'não';
    component.updateFilteredDoctors();
    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].isActive).toBeFalse();

    component.search = '9999';
    component.updateFilteredDoctors();
    expect(component.filteredDoctors.length).toBe(0);
  });

  it('should navigate to proper routes', () => {
    component.navigateTo('/doctors/create');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/create']);

    component.navigateTo('/doctors/details/1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/details/1']);

    component.navigateTo('/doctors/edit/2');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/edit/2']);

    component.navigateTo('/doctors/delete/1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors/delete/1']);
  });

  it('should render table rows correctly', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);

    const firstRow = rows[0].nativeElement;
    expect(firstRow.textContent).toContain('1');
    expect(firstRow.textContent).toContain('Dr. A');
    expect(firstRow.textContent).toContain('123');
    expect(firstRow.textContent).toContain('Cardio');
    expect(firstRow.textContent).toContain('Sim');

    const secondRow = rows[1].nativeElement;
    expect(secondRow.textContent).toContain('2');
    expect(secondRow.textContent).toContain('Dr. B');
    expect(secondRow.textContent).toContain('456');
    expect(secondRow.textContent).toContain('Neuro');
    expect(secondRow.textContent).toContain('Não');
  });

  it('should display "Nenhum médico encontrado" when filteredDoctors is empty', () => {
    component.filteredDoctors = [];
    fixture.detectChanges();
    const noResults = fixture.debugElement.query(By.css('.noResults'));
    expect(noResults.nativeElement.textContent).toContain('Nenhum médico encontrado.');
  });
});
