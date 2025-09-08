import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteSpecialtyComponent } from './delete-specialty.component';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('DeleteSpecialtyComponent', () => {
  let component: DeleteSpecialtyComponent;
  let fixture: ComponentFixture<DeleteSpecialtyComponent>;
  let mockSpecialtyService: jasmine.SpyObj<SpecialtyService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const specialtyMock: Specialty = { id: 1, name: 'Cardiology' };

  beforeEach(async () => {
    mockSpecialtyService = jasmine.createSpyObj('SpecialtyService', ['getById', 'delete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null),
          has: (key: string) => key === 'id',
          getAll: (key: string) => (key === 'id' ? ['1'] : []),
          keys: ['id'],
        }
      }
    } as any;

    mockSpecialtyService.getById.and.returnValue(specialtyMock);

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
    expect(mockSpecialtyService.getById).toHaveBeenCalledWith(1);
    expect(component.specialty).toEqual(specialtyMock);
  });

  it('should delete specialty and navigate when handleDelete is called', () => {
    component.handleDelete();

    expect(mockSpecialtyService.delete).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should not call delete or navigate if no specialty is loaded', () => {
    component.specialty = null;
    component.handleDelete();

    expect(mockSpecialtyService.delete).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back on cancel', () => {
    component.handleCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should show loading template if specialty is null', () => {
    component.specialty = null;
    fixture.detectChanges();

    const loadingEl: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(loadingEl.textContent).toContain('Carregando');
  });
});
