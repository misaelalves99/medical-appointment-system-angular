// src/app/pages/specialty/create/create-specialty.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSpecialtyComponent } from './create-specialty.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../../services/specialty.service';
import { By } from '@angular/platform-browser';

describe('CreateSpecialtyComponent', () => {
  let component: CreateSpecialtyComponent;
  let fixture: ComponentFixture<CreateSpecialtyComponent>;
  let specialtyServiceSpy: jasmine.SpyObj<SpecialtyService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    specialtyServiceSpy = jasmine.createSpyObj('SpecialtyService', ['add']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CreateSpecialtyComponent, FormsModule],
      providers: [
        { provide: SpecialtyService, useValue: specialtyServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call add and navigate on valid submit', () => {
    component.name = '  Cardiology  ';
    const form = { invalid: false } as NgForm;

    component.handleSubmit(form);

    expect(specialtyServiceSpy.add).toHaveBeenCalledWith({ name: 'Cardiology' });
    expect(component.name).toBe('');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should not call add if form is invalid', () => {
    const form = { invalid: true } as NgForm;

    component.handleSubmit(form);

    expect(specialtyServiceSpy.add).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not call add if name is empty or whitespace', () => {
    const form = { invalid: false } as NgForm;

    component.name = '   ';
    component.handleSubmit(form);
    expect(specialtyServiceSpy.add).not.toHaveBeenCalled();

    component.name = '';
    component.handleSubmit(form);
    expect(specialtyServiceSpy.add).not.toHaveBeenCalled();
  });

  it('should update name when input value changes (two-way binding)', () => {
    const input = fixture.debugElement.query(By.css('input#specialtyName')).nativeElement as HTMLInputElement;

    input.value = 'Neurology';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.name).toBe('Neurology');
  });

  it('should navigate back on cancel', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/specialty']);
  });

  it('should trigger handleSubmit on form submit', () => {
    spyOn(component, 'handleSubmit');
    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', {});
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should trigger handleCancel on back button click', () => {
    const backBtn = fixture.debugElement.query(By.css('button.back'));
    backBtn.nativeElement.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/specialty']);
  });
});
