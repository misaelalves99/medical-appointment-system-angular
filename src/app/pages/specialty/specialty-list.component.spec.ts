// src/pages/specialty/specialty-list.component.spec.ts
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SpecialtyListComponent } from './specialty-list.component';
import { SpecialtyService, Specialty } from '../../services/specialty.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, BehaviorSubject } from 'rxjs';

describe('SpecialtyListComponent', () => {
  let component: SpecialtyListComponent;
  let fixture: ComponentFixture<SpecialtyListComponent>;
  let specialtyServiceMock: Partial<SpecialtyService>;
  let router: Router;

  const mockSpecialties: Specialty[] = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Neurology' },
    { id: 3, name: 'Dermatology' }
  ];

  beforeEach(waitForAsync(() => {
    // BehaviorSubject para simular specialties$ do serviço
    const specialties$ = new BehaviorSubject<Specialty[]>(mockSpecialties);

    specialtyServiceMock = {
      specialties$: specialties$,
      getById: jasmine.createSpy('getById').and.callFake((id: number) =>
        mockSpecialties.find(s => s.id === id)
      ),
    };

    TestBed.configureTestingModule({
      imports: [SpecialtyListComponent, RouterTestingModule, FormsModule],
      providers: [
        { provide: SpecialtyService, useValue: specialtyServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges(); // dispara o subscribe e popula specialties
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialties on init', () => {
    expect(component.specialties.length).toBe(3);
    expect(component.filteredSpecialties.length).toBe(3);
  });

  it('should filter specialties by name', () => {
    component.filter = 'derm';
    component.updateFilteredSpecialties();
    expect(component.filteredSpecialties.length).toBe(1);
    expect(component.filteredSpecialties[0].name).toBe('Dermatology');
  });

  it('should filter specialties by id', () => {
    component.filter = '2';
    component.updateFilteredSpecialties();
    expect(component.filteredSpecialties.length).toBe(1);
    expect(component.filteredSpecialties[0].id).toBe(2);
  });

  it('should show no results message if filter does not match', () => {
    component.filter = 'invalid';
    component.updateFilteredSpecialties();
    fixture.detectChanges();

    const noResults = fixture.debugElement.query(By.css('.noResults'));
    expect(noResults).toBeTruthy();
    expect(noResults.nativeElement.textContent).toContain('Nenhuma especialidade encontrada.');
  });

  it('should sort filtered specialties alphabetically', () => {
    component.filter = '';
    component.updateFilteredSpecialties();
    expect(component.filteredSpecialties.map(s => s.name)).toEqual([
      'Cardiology',
      'Dermatology',
      'Neurology'
    ]);
  });

  it('should navigate to the given path when navigateTo is called', () => {
    component.navigateTo('/specialty/create');
    expect(router.navigate).toHaveBeenCalledWith(['/specialty/create']);
  });

  it('should render specialty rows in the template', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    // Deve excluir a linha de "Nenhuma especialidade encontrada"
    expect(rows.length).toBe(3);
    expect(rows[0].nativeElement.textContent).toContain('Cardiology');
    expect(rows[1].nativeElement.textContent).toContain('Dermatology');
    expect(rows[2].nativeElement.textContent).toContain('Neurology');
  });

  it('should call navigateTo when action buttons are clicked', () => {
    spyOn(component, 'navigateTo');
    fixture.detectChanges();

    const firstRow = fixture.debugElement.query(By.css('tbody tr'));
    const actionButtons = firstRow.queryAll(By.css('.actionBtn'));

    actionButtons[0].nativeElement.click(); // Detalhes
    expect(component.navigateTo).toHaveBeenCalledWith('/specialty/details/1');

    actionButtons[1].nativeElement.click(); // Editar
    expect(component.navigateTo).toHaveBeenCalledWith('/specialty/edit/1');

    actionButtons[2].nativeElement.click(); // Excluir
    expect(component.navigateTo).toHaveBeenCalledWith('/specialty/delete/1');
  });

  it('should update filteredSpecialties when filter input changes', () => {
    component.filter = 'cardio';
    component.updateFilteredSpecialties();
    expect(component.filteredSpecialties.length).toBe(1);
    expect(component.filteredSpecialties[0].name).toBe('Cardiology');
  });
});
