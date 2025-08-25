// src/pages/patient/upload-profile-picture/upload-profile-picture.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadProfilePictureComponent } from './upload-profile-picture.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('UploadProfilePictureComponent', () => {
  let component: UploadProfilePictureComponent;
  let fixture: ComponentFixture<UploadProfilePictureComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [UploadProfilePictureComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadProfilePictureComponent);
    component = fixture.componentInstance;
    component.patientId = 1;
    component.patientName = 'João';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedFile on handleFileChange', () => {
    const file = new File(['file content'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.handleFileChange(event);
    expect(component.selectedFile).toBe(file);
  });

  it('should emit selectedFile on handleSubmit', () => {
    const file = new File(['file content'], 'test.png', { type: 'image/png' });
    component.selectedFile = file;

    spyOn(component.onUpload, 'emit');
    component.handleSubmit();
    expect(component.onUpload.emit).toHaveBeenCalledWith(file);
  });

  it('should not emit if no file selected', () => {
    component.selectedFile = null;
    spyOn(component.onUpload, 'emit');
    component.handleSubmit();
    expect(component.onUpload.emit).not.toHaveBeenCalled();
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/patient']);
  });
});
