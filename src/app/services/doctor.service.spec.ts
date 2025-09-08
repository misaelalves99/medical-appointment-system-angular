// src/app/services/doctor.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DoctorService, Doctor } from './doctor.service';
import { take } from 'rxjs/operators';

describe('DoctorService', () => {
  let service: DoctorService;

  const baseDoctor: Omit<Doctor, 'id'> = {
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
    service.getDoctors().pipe(take(1)).subscribe((doctors) => {
      expect(doctors.length).toBe(2);
      expect(doctors[0].name).toBe('Dr. João Silva');
      done();
    });
  });

  it('should get doctor by id', () => {
    const doctor = service.getById(1);
    expect(doctor).toBeDefined();
    expect(doctor!.id).toBe(1);
  });

  it('should return undefined for non-existing id', () => {
    const doctor = service.getById(999);
    expect(doctor).toBeUndefined();
  });

  it('should add a new doctor with auto-generated id', (done) => {
    service.add(baseDoctor as Doctor);
    service.getDoctors().pipe(take(1)).subscribe((doctors) => {
      const added = doctors.find(d => d.email === baseDoctor.email);
      expect(added).toBeDefined();
      expect(added!.id).toBeGreaterThan(2); // deve ser 3 em diante
      expect(added!.name).toBe('Dr. Carlos Mendes');
      done();
    });
  });

  it('should update an existing doctor', (done) => {
    service.add(baseDoctor as Doctor);
    service.getDoctors().pipe(take(1)).subscribe((doctors) => {
      const added = doctors.find(d => d.email === baseDoctor.email)!;
      const updatedDoctor: Doctor = { ...added, specialty: 'Pediatria' };
      service.update(updatedDoctor);

      const doctorAfterUpdate = service.getById(added.id!);
      expect(doctorAfterUpdate!.specialty).toBe('Pediatria');
      done();
    });
  });

  it('should delete a doctor', (done) => {
    service.add(baseDoctor as Doctor);
    service.getDoctors().pipe(take(1)).subscribe((doctors) => {
      const added = doctors.find(d => d.email === baseDoctor.email)!;
      service.delete(added.id!);

      service.getDoctors().pipe(take(1)).subscribe((newDoctors) => {
        const deleted = newDoctors.find(d => d.id === added.id);
        expect(deleted).toBeUndefined();
        done();
      });
    });
  });
});
