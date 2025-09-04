// src/app/services/doctor.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DoctorService, Doctor } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;

  const baseDoctor: Doctor = {
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

  it('should add a new doctor with auto-generated id', (done) => {
    service.add(baseDoctor);
    service.getDoctors().subscribe((doctors) => {
      const added = doctors.find(d => d.email === baseDoctor.email);
      expect(added).toBeDefined();
      expect(added!.id).toBeGreaterThan(2); // deve ser 3 em diante
      expect(added!.name).toBe('Dr. Carlos Mendes');
      done();
    });
  });

  it('should update an existing doctor', (done) => {
    // adiciona primeiro para garantir que existe
    service.add(baseDoctor);
    service.getDoctors().subscribe((doctors) => {
      const added = doctors.find(d => d.email === baseDoctor.email)!;
      const updatedDoctor = { ...added, specialty: 'Pediatria' };
      service.update(updatedDoctor);

      service.getById(added.id!).subscribe((doctor) => {
        expect(doctor!.specialty).toBe('Pediatria');
        done();
      });
    });
  });

  it('should delete a doctor', (done) => {
    // adiciona e depois deleta
    service.add(baseDoctor);
    service.getDoctors().subscribe((doctors) => {
      const added = doctors.find(d => d.email === baseDoctor.email)!;
      service.delete(added.id!);

      service.getDoctors().subscribe((newDoctors) => {
        const deleted = newDoctors.find(d => d.id === added.id);
        expect(deleted).toBeUndefined();
        done();
      });
    });
  });
});
