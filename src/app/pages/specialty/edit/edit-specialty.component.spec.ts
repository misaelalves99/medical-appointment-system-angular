// src/app/pages/specialty/edit/edit-specialty.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSpecialtyComponent } from './edit-specialty.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { By } from '@angular/platform-browser';

describe('EditSpecialtyComponent', () => {
  let component: EditSpecialtyComponent;
  let fixture: ComponentFixture<EditSpecialtyComponent>;
  let mockSpecialtyService: jasmine.SpyObj<SpecialtyService>;
  let router: Router;

  beforeEach(async () => {
    mockSpecialtyService = jasmine.createSpyObj('SpecialtyService', [
      'getSpecialtyById',
      'updateSpecialty'
    ]);

    await TestBed.configureTestingModule({
      imports: [EditSpecialtyComponent, RouterTestingModule, FormsModule],
      providers: [
        { provide: SpecialtyService, useValue: mockSpecialtyService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', '1']]) }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSpecialtyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialty by id on init', () => {
    const specialty: Specialty = { id: 1, name: 'Cardiology' };
    mockSpecialtyService.getSpecialtyById.and.returnValue(specialty);

    component.ngOnInit();

    expect(component.id).toBe(1);
    expect(component.specialty).toEqual(specialty);
    expect(component.name).toBe('Cardiology');
  });

  it('should show notFound template if specialty does not exist', () => {
    mockSpecialtyService.getSpecialtyById.and.returnValue(undefined);

    component.ngOnInit();
    fixture.detectChanges();

    const notFoundEl = fixture.debugElement.query(By.css('ng-template'));
    expect(component.specialty).toBeUndefined();
    expect(notFoundEl).toBeTruthy();
  });

  it('should update specialty and navigate when form is valid', () => {
    const specialty: Specialty = { id: 1, name: 'Old Name' };
    mockSpecialtyService.getSpecialtyById.and.returnValue(specialty);

    component.ngOnInit();
    component.name = 'New Name';

    const mockForm = { invalid: false } as NgForm;
    component.handleSubmit(mockForm);

    expect(mockSpecialtyService.updateSpecialty).toHaveBeenCalledWith(1, 'New Name');
    expect(router.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should set error when name is empty', () => {
    const specialty: Specialty = { id: 1, name: 'Test' };
    mockSpecialtyService.getSpecialtyById.and.returnValue(specialty);

    component.ngOnInit();
    component.name = '   ';

    const mockForm = { invalid: false } as NgForm;
    component.handleSubmit(mockForm);

    expect(component.error).toBe('O nome da especialidade é obrigatório.');
    expect(mockSpecialtyService.updateSpecialty).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    const specialty: Specialty = { id: 1, name: 'Test' };
    mockSpecialtyService.getSpecialtyById.and.returnValue(specialty);

    component.ngOnInit();
    component.name = 'Valid';

    const mockForm = { invalid: true } as NgForm;
    component.handleSubmit(mockForm);

    expect(mockSpecialtyService.updateSpecialty).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should display error message in template', () => {
    component.error = 'O nome da especialidade é obrigatório.';
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.textDanger')).nativeElement as HTMLElement;
    expect(errorEl.textContent).toContain('O nome da especialidade é obrigatório.');
  });

  it('should navigate back when handleCancel is called', () => {
    component.handleCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/specialty']);
  });
});
