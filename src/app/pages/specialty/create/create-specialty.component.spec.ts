// src/pages/specialty/create/create-specialty.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSpecialtyComponent } from './create-specialty.component';
import { FormsModule } from '@angular/forms';
import { fireEvent, screen } from '@testing-library/angular';

describe('CreateSpecialtyComponent', () => {
  let component: CreateSpecialtyComponent;
  let fixture: ComponentFixture<CreateSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSpecialtyComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSubmit with trimmed name and reset input', () => {
    spyOn(component.onSubmit, 'emit');

    component.name = '  Cardiology  ';
    component.handleSubmit();

    expect(component.onSubmit.emit).toHaveBeenCalledWith('Cardiology');
    expect(component.name).toBe('');
  });

  it('should not emit if name is empty or whitespace', () => {
    spyOn(component.onSubmit, 'emit');

    component.name = '   ';
    component.handleSubmit();
    expect(component.onSubmit.emit).not.toHaveBeenCalled();

    component.name = '';
    component.handleSubmit();
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });

  it('should update name when input value changes', async () => {
    const input = fixture.nativeElement.querySelector('input#specialtyName') as HTMLInputElement;

    input.value = 'Neurology';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.name).toBe('Neurology');
  });
});
