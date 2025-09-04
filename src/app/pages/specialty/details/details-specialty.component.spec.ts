// src/pages/specialty/details/details-specialty.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsSpecialtyComponent } from './details-specialty.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('DetailsSpecialtyComponent', () => {
  let component: DetailsSpecialtyComponent;
  let fixture: ComponentFixture<DetailsSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSpecialtyComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsSpecialtyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLElement;
    expect(title.textContent).toContain('Detalhes da Especialidade');
  });

  it('should display the specialty id and name', () => {
    component.id = 5;
    component.name = 'Cardiology';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('5');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('Cardiology');
  });

  it('should render edit and back links with correct routerLink', () => {
    component.id = 7;
    component.name = 'Neurology';
    fixture.detectChanges();

    const editLink = fixture.debugElement.query(By.css('a.edit')).nativeElement as HTMLAnchorElement;
    const backLink = fixture.debugElement.query(By.css('a.back')).nativeElement as HTMLAnchorElement;

    expect(editLink.getAttribute('href')).toBe('/specialty/edit/7');
    expect(backLink.getAttribute('href')).toBe('/specialty');
  });

  it('should not break if id or name are undefined', () => {
    component.id = undefined as any;
    component.name = undefined as any;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('ID:');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('Nome:');
  });
});
