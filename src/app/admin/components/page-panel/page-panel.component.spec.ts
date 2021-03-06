/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagePanelComponent } from './page-panel.component';

describe('PagePanelComponent', () => {
  let component: PagePanelComponent;
  let fixture: ComponentFixture<PagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
