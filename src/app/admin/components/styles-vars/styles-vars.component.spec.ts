/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StylesVarsComponent } from './styles-vars.component';

describe('StylesVarsComponent', () => {
  let component: StylesVarsComponent;
  let fixture: ComponentFixture<StylesVarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesVarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesVarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
