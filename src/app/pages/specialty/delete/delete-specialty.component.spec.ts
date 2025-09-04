// src/app/pages/specialty/delete/delete-specialty.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteSpecialtyComponent } from './delete-specialty.component';
import { SpecialtyService } from '../../../services/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('DeleteSpecialtyComponent', () => {
  let component: DeleteSpecialtyComponent;
  let fixture: ComponentFixture<DeleteSpecialtyComponent>;
  let mockSpecialtyService: jasmine.SpyObj<SpecialtyService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockSpecialtyService = jasmine.createSpyObj('SpecialtyService', ['getSpecialtyById', 'deleteSpecialty']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null)
        }
      }
    } as any;

    mockSpecialtyService.getSpecialtyById.and.returnValue({ id: 1, name: 'Cardiology' });

    await TestBed.configureTestingModule({
      imports: [DeleteSpecialtyComponent],
      providers: [
        { provide: SpecialtyService, useValue: mockSpecialtyService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialty on init using route param', () => {
    expect(mockSpecialtyService.getSpecialtyById).toHaveBeenCalledWith(1);
    expect(component.specialty).toEqual({ id: 1, name: 'Cardiology' });
  });

  it('should delete specialty and navigate when handleDelete is called', () => {
    component.handleDelete();

    expect(mockSpecialtyService.deleteSpecialty).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should not throw or call delete if no specialty is loaded', () => {
    component.specialty = null;

    component.handleDelete();

    expect(mockSpecialtyService.deleteSpecialty).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back on cancel', () => {
    component.handleCancel();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });
});
