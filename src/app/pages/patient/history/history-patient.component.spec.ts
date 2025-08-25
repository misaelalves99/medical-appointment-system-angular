// src/pages/patient/history/history-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryPatientComponent, PatientHistoryItem } from './history-patient.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HistoryPatientComponent', () => {
  let component: HistoryPatientComponent;
  let fixture: ComponentFixture<HistoryPatientComponent>;
  let mockRouter: any;

  const historyData: PatientHistoryItem[] = [
    { recordDate: '2025-08-20T10:00:00Z', description: 'Consulta de rotina', notes: 'Sem observações' },
    { recordDate: '2025-08-21T12:00:00Z', description: 'Retorno', notes: null },
  ];

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [HistoryPatientComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPatientComponent);
    component = fixture.componentInstance;
    component.history = historyData;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort history by recordDate descending', () => {
    const sorted = component.sortedHistory;
    expect(sorted[0].recordDate).toBe('2025-08-21T12:00:00Z');
    expect(sorted[1].recordDate).toBe('2025-08-20T10:00:00Z');
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2025-08-21T12:00:00Z');
    const expected = new Date('2025-08-21T12:00:00Z').toLocaleDateString('pt-BR');
    expect(formatted).toBe(expected);
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should render table rows for history items', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[1].nativeElement.textContent).toContain('Retorno'); // último registro primeiro
    expect(firstRowCells[2].nativeElement.textContent).toContain('-'); // notes null
  });

  it('should trigger goBack when back link is clicked', () => {
    const backLink = fixture.debugElement.query(By.css('.backLink'));
    backLink.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
