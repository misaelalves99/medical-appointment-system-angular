// src/app/services/specialty.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { SpecialtyService, Specialty } from './specialty.service';

describe('SpecialtyService', () => {
  let service: SpecialtyService;

  const baseSpecialtyName = "Neurologia";

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial specialties', (done) => {
    service.getSpecialties().subscribe((specialties) => {
      expect(specialties.length).toBe(2);
      expect(specialties[0].name).toBe("Cardiologia");
      done();
    });
  });

  it('should get specialty by id', (done) => {
    const specialty = service.getSpecialtyById(1);
    expect(specialty).toBeDefined();
    expect(specialty!.id).toBe(1);
    done();
  });

  it('should return undefined for non-existing id', (done) => {
    const specialty = service.getSpecialtyById(999);
    expect(specialty).toBeUndefined();
    done();
  });

  it('should add a new specialty with auto-generated id', (done) => {
    service.addSpecialty(baseSpecialtyName);
    service.getSpecialties().subscribe((specialties) => {
      const added = specialties.find(s => s.name === baseSpecialtyName);
      expect(added).toBeDefined();
      expect(added!.id).toBeGreaterThan(2); // ID gerado automaticamente
      expect(added!.name).toBe(baseSpecialtyName);
      done();
    });
  });

  it('should update an existing specialty', (done) => {
    service.addSpecialty(baseSpecialtyName);
    service.getSpecialties().subscribe((specialties) => {
      const added = specialties.find(s => s.name === baseSpecialtyName)!;
      service.updateSpecialty(added.id!, "Neurocirurgia");

      const updated = service.getSpecialtyById(added.id!);
      expect(updated!.name).toBe("Neurocirurgia");
      done();
    });
  });

  it('should delete a specialty', (done) => {
    service.addSpecialty(baseSpecialtyName);
    service.getSpecialties().subscribe((specialties) => {
      const added = specialties.find(s => s.name === baseSpecialtyName)!;
      service.deleteSpecialty(added.id!);

      const deleted = service.getSpecialtyById(added.id!);
      expect(deleted).toBeUndefined();
      done();
    });
  });
});
