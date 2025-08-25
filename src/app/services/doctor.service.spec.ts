// src/app/services/doctor.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DoctorService, Doctor } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;

  const newDoctor: Doctor = {
    id: 3,
    name: 'Dr. Carlos Mendes',
    crm: '789012',
    specialty: 'Ortopedia',
    email: 'carlos.mendes@hospital.com',
    phone: '(11) 97777-7777',
    isActive: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial doctors', (done) => {
    service.getDoctors().subscribe((doctors) => {
      expect(doctors.length).toBe(2);
      expect(doctors[0].name).toBe('Dr. João Silva');
      done();
    });
  });

  it('should get doctor by id', (done) => {
    service.getById(1).subscribe((doctor) => {
      expect(doctor).toBeDefined();
      expect(doctor!.id).toBe(1);
      done();
    });
  });

  it('should return undefined for non-existing id', (done) => {
    service.getById(999).subscribe((doctor) => {
      expect(doctor).toBeUndefined();
      done();
    });
  });

  it('should add a new doctor', (done) => {
    service.add(newDoctor);
    service.getDoctors().subscribe((doctors) => {
      const added = doctors.find(d => d.id === newDoctor.id);
      expect(added).toBeDefined();
      expect(added!.name).toBe('Dr. Carlos Mendes');
      done();
    });
  });

  it('should update an existing doctor', (done) => {
    const updatedDoctor = { ...newDoctor, specialty: 'Pediatria' };
    service.update(updatedDoctor);
    service.getById(newDoctor.id).subscribe((doctor) => {
      expect(doctor!.specialty).toBe('Pediatria');
      done();
    });
  });

  it('should delete a doctor', (done) => {
    service.delete(newDoctor.id);
    service.getDoctors().subscribe((doctors) => {
      const deleted = doctors.find(d => d.id === newDoctor.id);
      expect(deleted).toBeUndefined();
      done();
    });
  });
});
