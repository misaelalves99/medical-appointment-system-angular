// src/app/services/patient.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { PatientService, Patient } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  const basePatient: Patient = {
    name: "João Pereira",
    cpf: "111.222.333-44",
    dateOfBirth: "1995-08-21",
    email: "joao@email.com",
    phone: "5555-5555",
    address: "Rua C, 789",
    gender: "Masculino",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial patients', (done) => {
    service.getPatients().subscribe((patients) => {
      expect(patients.length).toBe(2);
      expect(patients[0].name).toBe("Carlos Oliveira");
      done();
    });
  });

  it('should get patient by id', (done) => {
    service.getById(1).subscribe((patient) => {
      expect(patient).toBeDefined();
      expect(patient!.id).toBe(1);
      done();
    });
  });

  it('should return undefined for non-existing id', (done) => {
    service.getById(999).subscribe((patient) => {
      expect(patient).toBeUndefined();
      done();
    });
  });

  it('should add a new patient with auto-generated id', (done) => {
    service.add(basePatient);
    service.getPatients().subscribe((patients) => {
      const added = patients.find(p => p.email === basePatient.email);
      expect(added).toBeDefined();
      expect(added!.id).toBeGreaterThan(2); // ID gerado automaticamente
      expect(added!.name).toBe("João Pereira");
      done();
    });
  });

  it('should update an existing patient', (done) => {
    // adiciona paciente primeiro
    service.add(basePatient);
    service.getPatients().subscribe((patients) => {
      const added = patients.find(p => p.email === basePatient.email)!;
      const updatedPatient = { ...added, address: "Rua D, 999" };
      service.update(updatedPatient);

      service.getById(added.id!).subscribe((patient) => {
        expect(patient!.address).toBe("Rua D, 999");
        done();
      });
    });
  });

  it('should delete a patient', (done) => {
    service.add(basePatient);
    service.getPatients().subscribe((patients) => {
      const added = patients.find(p => p.email === basePatient.email)!;
      service.delete(added.id!);

      service.getPatients().subscribe((newPatients) => {
        const deleted = newPatients.find(p => p.id === added.id);
        expect(deleted).toBeUndefined();
        done();
      });
    });
  });
});
