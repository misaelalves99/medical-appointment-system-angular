// src/app/pages/specialty/edit/edit-specialty.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSpecialtyComponent } from './edit-specialty.component';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('EditSpecialtyComponent', () => {
  let component: EditSpecialtyComponent;
  let fixture: ComponentFixture<EditSpecialtyComponent>;
  let mockSpecialtyService: jasmine.SpyObj<SpecialtyService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const specialtyMock: Specialty = { id: 1, name: 'Cardiology' };

  beforeEach(async () => {
    mockSpecialtyService = jasmine.createSpyObj('SpecialtyService', ['getById', 'update']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // ⚡ Cast correto usando 'unknown' para evitar erros de TypeScript
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null),
          has: (key: string) => key === 'id',
          getAll: (key: string) => (key === 'id' ? ['1'] : []),
          keys: ['id']
        }
      }
    } as unknown as Partial<ActivatedRoute>;

    mockSpecialtyService.getById.and.returnValue(specialtyMock);

    await TestBed.configureTestingModule({
      imports: [EditSpecialtyComponent, RouterTestingModule, FormsModule],
      providers: [
        { provide: SpecialtyService, useValue: mockSpecialtyService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialty by id on init', () => {
    expect(mockSpecialtyService.getById).toHaveBeenCalledWith(1);
    expect(component.specialty).toEqual(specialtyMock);
    expect(component.name).toBe('Cardiology');
  });

  it('should show notFound template if specialty does not exist', () => {
    mockSpecialtyService.getById.and.returnValue(undefined);
    component.ngOnInit();
    fixture.detectChanges();

    const notFoundEl = fixture.nativeElement.querySelector('p');
    expect(component.specialty).toBeUndefined();
    expect(notFoundEl.textContent).toContain('Especialidade não encontrada');
  });

  it('should update specialty and navigate when form is valid', () => {
    component.name = 'New Name';
    const mockForm = { invalid: false } as NgForm;

    component.handleSubmit(mockForm);

    expect(mockSpecialtyService.update).toHaveBeenCalledWith({ id: 1, name: 'New Name' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should set error when name is empty', () => {
    component.name = '   ';
    const mockForm = { invalid: false } as NgForm;

    component.handleSubmit(mockForm);

    expect(component.error).toBe('O nome da especialidade é obrigatório.');
    expect(mockSpecialtyService.update).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    component.name = 'Valid Name';
    const mockForm = { invalid: true } as NgForm;

    component.handleSubmit(mockForm);

    expect(mockSpecialtyService.update).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should display error message in template', () => {
    component.error = 'O nome da especialidade é obrigatório.';
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.textDanger')).nativeElement as HTMLElement;
    expect(errorEl.textContent).toContain('O nome da especialidade é obrigatório.');
  });

  it('should navigate back when handleCancel is called', () => {
    component.handleCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });
});
