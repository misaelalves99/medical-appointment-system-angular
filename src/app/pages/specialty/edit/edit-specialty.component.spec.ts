// src/pages/specialty/edit/edit-specialty.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSpecialtyComponent } from './edit-specialty.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('EditSpecialtyComponent', () => {
  let component: EditSpecialtyComponent;
  let fixture: ComponentFixture<EditSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpecialtyComponent, RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSpecialtyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the name with initialName input', () => {
    component.initialName = 'Cardiology';
    component.ngOnInit();
    expect(component.name).toBe('Cardiology');
  });

  it('should emit onSubmit with trimmed name when handleSubmit is called with valid name', () => {
    component.id = 1;
    component.name = '  Cardiology  ';
    spyOn(component.onSubmit, 'emit');

    component.handleSubmit();

    expect(component.error).toBeNull();
    expect(component.onSubmit.emit).toHaveBeenCalledWith({ id: 1, name: 'Cardiology' });
  });

  it('should set error when handleSubmit is called with empty name', () => {
    component.name = '   ';
    spyOn(component.onSubmit, 'emit');

    component.handleSubmit();

    expect(component.error).toBe('O nome da especialidade é obrigatório.');
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });

  it('should display error message in template', () => {
    component.error = 'O nome da especialidade é obrigatório.';
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.textDanger')).nativeElement as HTMLElement;
    expect(errorEl.textContent).toContain('O nome da especialidade é obrigatório.');
  });
});
