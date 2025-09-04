// src/pages/specialty/specialty-list.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SpecialtyListComponent } from './specialty-list.component';
import { SpecialtyService } from '../../services/specialty.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SpecialtyListComponent', () => {
  let component: SpecialtyListComponent;
  let fixture: ComponentFixture<SpecialtyListComponent>;
  let specialtyServiceMock: any;
  let router: Router;

  const mockSpecialties = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Neurology' },
    { id: 3, name: 'Dermatology' }
  ];

  beforeEach(waitForAsync(() => {
    specialtyServiceMock = {
      getSpecialties: jasmine.createSpy('getSpecialties').and.returnValue(of(mockSpecialties))
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
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialties on ngOnInit', () => {
    expect(specialtyServiceMock.getSpecialties).toHaveBeenCalled();
    expect(component.specialties.length).toBe(3);
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
    spyOn(router, 'navigate');
    component.navigateTo('/specialty/create');
    expect(router.navigate).toHaveBeenCalledWith(['/specialty/create']);
  });

  it('should render specialty rows in the template', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
    expect(rows[0].nativeElement.textContent).toContain('Cardiology');
    expect(rows[1].nativeElement.textContent).toContain('Neurology');
    expect(rows[2].nativeElement.textContent).toContain('Dermatology');
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
});
