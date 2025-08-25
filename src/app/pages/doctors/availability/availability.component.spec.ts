// src/pages/Doctor/Availability/availability.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailabilityComponent, DoctorAvailability } from './availability.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('AvailabilityComponent', () => {
  let component: AvailabilityComponent;
  let fixture: ComponentFixture<AvailabilityComponent>;

  const mockAvailabilities: DoctorAvailability[] = [
    { doctorId: 2, date: '2025-08-22', startTime: '10:00', endTime: '12:00', isAvailable: false },
    { doctorId: 1, date: '2025-08-21', startTime: '08:00', endTime: '12:00', isAvailable: true },
    { doctorId: 1, date: '2025-08-21', startTime: '13:00', endTime: '16:00', isAvailable: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailabilityComponent);
    component = fixture.componentInstance;
    component.availabilities = [...mockAvailabilities];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort availabilities by date and startTime', () => {
    const sorted = component.sortedAvailabilities;
    expect(sorted[0].date).toBe('2025-08-21');
    expect(sorted[0].startTime).toBe('08:00');
    expect(sorted[1].startTime).toBe('13:00');
    expect(sorted[2].date).toBe('2025-08-22');
  });

  it('should render all availabilities in the table', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('1'); // doctorId
    expect(firstRowCells[1].nativeElement.textContent).toContain('21/08/2025'); // date
    expect(firstRowCells[4].nativeElement.textContent).toContain('Sim'); // isAvailable
  });

  it('should display "Sim" or "Não" based on availability', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    const availableCellText = rows[0].queryAll(By.css('td'))[4].nativeElement.textContent;
    const unavailableCellText = rows[2].queryAll(By.css('td'))[4].nativeElement.textContent;
    
    expect(availableCellText).toBe('Sim');
    expect(unavailableCellText).toBe('Não');
  });
});
