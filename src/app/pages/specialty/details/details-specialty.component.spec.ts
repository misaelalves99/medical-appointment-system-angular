// src/pages/specialty/details/details-specialty.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsSpecialtyComponent } from './details-specialty.component';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('DetailsSpecialtyComponent', () => {
  let component: DetailsSpecialtyComponent;
  let fixture: ComponentFixture<DetailsSpecialtyComponent>;
  let mockSpecialtyService: jasmine.SpyObj<SpecialtyService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const specialtyMock: Specialty = { id: 5, name: 'Cardiology' };

  beforeEach(async () => {
    mockSpecialtyService = jasmine.createSpyObj('SpecialtyService', ['getById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '5' : null),
        },
      },
    } as any;

    mockSpecialtyService.getById.and.returnValue(specialtyMock);

    await TestBed.configureTestingModule({
      imports: [DetailsSpecialtyComponent, RouterTestingModule],
      providers: [
        { provide: SpecialtyService, useValue: mockSpecialtyService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara o ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialty on init', () => {
    expect(mockSpecialtyService.getById).toHaveBeenCalledWith(5);
    expect(component.specialty).toEqual(specialtyMock);
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLElement;
    expect(title.textContent).toContain('Detalhes da Especialidade');
  });

  it('should display the specialty id and name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('5');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('Cardiology');
  });

  it('should render edit and back links with correct routerLink', () => {
    const editLink = fixture.debugElement.query(By.css('a.edit')).nativeElement as HTMLAnchorElement;
    const backLink = fixture.debugElement.query(By.css('a.back')).nativeElement as HTMLAnchorElement;

    expect(editLink.getAttribute('href')).toBe('/specialty/edit/5');
    expect(backLink.getAttribute('href')).toBe('/specialty');
  });

  it('should show "not found" template if specialty is null', () => {
    component.specialty = null;
    fixture.detectChanges();

    const notFoundEl = fixture.nativeElement.querySelector('p');
    expect(notFoundEl.textContent).toContain('Especialidade não encontrada');
  });
});
