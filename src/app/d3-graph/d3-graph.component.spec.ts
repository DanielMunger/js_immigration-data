/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { D3GraphComponent } from './d3-graph.component';

describe('D3GraphComponent', () => {
  let component: D3GraphComponent;
  let fixture: ComponentFixture<D3GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3GraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
