// src/app/services/specialty.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { SpecialtyService, Specialty } from './specialty.service';
import { take } from 'rxjs/operators';

describe('SpecialtyService', () => {
  let service: SpecialtyService;

  const baseSpecialty: Omit<Specialty, 'id'> = { name: "Neurologia" };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial specialties', (done) => {
    service.getSpecialties().pipe(take(1)).subscribe((specialties) => {
      expect(specialties.length).toBe(2);
      expect(specialties[0].name).toBe("Cardiologia");
      done();
    });
  });

  it('should get specialty by id', () => {
    const specialty = service.getById(1);
    expect(specialty).toBeDefined();
    expect(specialty!.id).toBe(1);
  });

  it('should return undefined for non-existing id', () => {
    const specialty = service.getById(999);
    expect(specialty).toBeUndefined();
  });

  it('should add a new specialty with auto-generated id', (done) => {
    service.add(baseSpecialty);
    service.getSpecialties().pipe(take(1)).subscribe((specialties) => {
      const added = specialties.find(s => s.name === baseSpecialty.name);
      expect(added).toBeDefined();
      expect(added!.id).toBeGreaterThan(2);
      expect(added!.name).toBe(baseSpecialty.name);
      done();
    });
  });

  it('should update an existing specialty', (done) => {
    service.add(baseSpecialty);
    service.getSpecialties().pipe(take(1)).subscribe((specialties) => {
      const added = specialties.find(s => s.name === baseSpecialty.name)!;
      const updatedSpecialty: Specialty = { ...added, name: "Neurocirurgia" };
      service.update(updatedSpecialty);

      const updated = service.getById(added.id!);
      expect(updated!.name).toBe("Neurocirurgia");
      done();
    });
  });

  it('should delete a specialty', (done) => {
    service.add(baseSpecialty);
    service.getSpecialties().pipe(take(1)).subscribe((specialties) => {
      const added = specialties.find(s => s.name === baseSpecialty.name)!;
      service.delete(added.id!);

      const deleted = service.getById(added.id!);
      expect(deleted).toBeUndefined();
      done();
    });
  });
});
