// src/app/services/specialty.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { SpecialtyService, Specialty } from './specialty.service';

describe('SpecialtyService', () => {
  let service: SpecialtyService;

  const newSpecialty: Specialty = { id: 3, name: "Neurologia" };

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
    service.getById(1).subscribe((specialty) => {
      expect(specialty).toBeDefined();
      expect(specialty!.id).toBe(1);
      done();
    });
  });

  it('should return undefined for non-existing id', (done) => {
    service.getById(999).subscribe((specialty) => {
      expect(specialty).toBeUndefined();
      done();
    });
  });

  it('should add a new specialty', (done) => {
    service.add(newSpecialty);
    service.getSpecialties().subscribe((specialties) => {
      const added = specialties.find(s => s.id === newSpecialty.id);
      expect(added).toBeDefined();
      expect(added!.name).toBe("Neurologia");
      done();
    });
  });

  it('should update an existing specialty', (done) => {
    const updatedSpecialty = { ...newSpecialty, name: "Neurocirurgia" };
    service.update(updatedSpecialty);
    service.getById(newSpecialty.id).subscribe((specialty) => {
      expect(specialty!.name).toBe("Neurocirurgia");
      done();
    });
  });

  it('should delete a specialty', (done) => {
    service.delete(newSpecialty.id);
    service.getSpecialties().subscribe((specialties) => {
      const deleted = specialties.find(s => s.id === newSpecialty.id);
      expect(deleted).toBeUndefined();
      done();
    });
  });
});
