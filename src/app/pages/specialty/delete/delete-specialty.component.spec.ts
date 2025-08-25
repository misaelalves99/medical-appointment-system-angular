// src/pages/specialty/delete/delete-specialty.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteSpecialtyComponent } from './delete-specialty.component';
import { SpecialtyService } from '../../../services/specialty.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DeleteSpecialtyComponent', () => {
  let component: DeleteSpecialtyComponent;
  let fixture: ComponentFixture<DeleteSpecialtyComponent>;
  let mockSpecialtyService: jasmine.SpyObj<SpecialtyService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockSpecialtyService = jasmine.createSpyObj('SpecialtyService', ['getById', 'delete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mock minimalista para ActivatedRoute.snapshot
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null)
        }
      }
    } as any; // <-- cast para 'any' para ignorar propriedades faltantes

    mockSpecialtyService.getById.and.returnValue(of({ id: 1, name: 'Cardiology' }));

    await TestBed.configureTestingModule({
      imports: [DeleteSpecialtyComponent, CommonModule, FormsModule],
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

  it('should load specialty on init', () => {
    expect(component.specialty).toEqual({ id: 1, name: 'Cardiology' });
    expect(mockSpecialtyService.getById).toHaveBeenCalledWith(1);
  });

  it('should delete specialty and navigate if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.handleSubmit();

    expect(mockSpecialtyService.delete).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should not delete specialty if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.handleSubmit();

    expect(mockSpecialtyService.delete).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back on cancel', () => {
    component.handleCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });
});
