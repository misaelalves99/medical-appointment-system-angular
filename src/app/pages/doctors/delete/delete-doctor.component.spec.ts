// src/pages/Doctors/Delete/delete-doctor.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDoctorComponent } from './delete-doctor.component';
import { DoctorService } from '../../../services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../types/doctor.model';

describe('DeleteDoctorComponent', () => {
  let component: DeleteDoctorComponent;
  let fixture: ComponentFixture<DeleteDoctorComponent>;
  let doctorServiceSpy: jasmine.SpyObj<DoctorService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const fakeDoctor: Doctor = {
    id: 1,
    name: 'Dr. Test',
    crm: '12345',
    specialty: 'Cardiologia',
    email: 'test@med.com',
    phone: '999999999',
    isActive: true,
  };

  beforeEach(async () => {
    doctorServiceSpy = jasmine.createSpyObj('DoctorService', ['getById', 'delete']);
    doctorServiceSpy.getById.and.returnValue(of(fakeDoctor));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DeleteDoctorComponent, CommonModule],
      providers: [
        { provide: DoctorService, useValue: doctorServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', '1']]) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load doctor on ngOnInit', () => {
    expect(component.doctor).toEqual(fakeDoctor);
    const nameEl = fixture.debugElement.query(By.css('strong')).nativeElement;
    expect(nameEl.textContent).toContain('Dr. Test');
  });

  it('should call delete and navigate when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.handleDelete();

    expect(doctorServiceSpy.delete).toHaveBeenCalledWith(fakeDoctor.id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should not delete if confirm returns false', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.handleDelete();

    expect(doctorServiceSpy.delete).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate on cancel', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/doctors']);
  });

  it('should display loading template if doctor is null', () => {
    component.doctor = null;
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('p'));
    expect(loadingEl.nativeElement.textContent).toContain('Carregando...');
  });

  it('should render all buttons', () => {
    const deleteBtn = fixture.debugElement.query(By.css('.deleteButton')).nativeElement;
    const cancelBtn = fixture.debugElement.query(By.css('.cancelButton')).nativeElement;

    expect(deleteBtn.textContent).toContain('Excluir');
    expect(cancelBtn.textContent).toContain('Cancelar');
  });
});
