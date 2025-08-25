// src/pages/patient/edit/edit-patient.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPatientComponent, PatientEditForm } from './edit-patient.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('EditPatientComponent', () => {
  let component: EditPatientComponent;
  let fixture: ComponentFixture<EditPatientComponent>;
  let mockRouter: any;

  const initialData: PatientEditForm = {
    id: 1,
    name: 'Maria Silva',
    cpf: '12345678900',
    dateOfBirth: '1990-01-01',
    email: 'maria@example.com',
    phone: '987654321',
    address: 'Rua A, 123'
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [EditPatientComponent, FormsModule],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPatientComponent);
    component = fixture.componentInstance;
    component.initialData = initialData;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formData from initialData', () => {
    expect(component.formData).toEqual(initialData);
  });

  it('should update formData on handleChange', () => {
    const input = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement as HTMLInputElement;
    input.value = 'Ana Souza';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.formData.name).toBe('Ana Souza');
  });

  it('should emit onSave when handleSubmit is called', () => {
    spyOn(component.onSave, 'emit');
    component.handleSubmit();
    expect(component.onSave.emit).toHaveBeenCalledWith(initialData);
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });

  it('should trigger handleSubmit on form submit', () => {
    spyOn(component, 'handleSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should trigger goBack on back button click', () => {
    const backBtn = fixture.debugElement.query(By.css('button.back'));
    backBtn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
