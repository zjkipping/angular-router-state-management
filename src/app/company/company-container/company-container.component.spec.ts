import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContainerComponent } from './company-container.component';

describe('CompanyContainerComponent', () => {
  let component: CompanyContainerComponent;
  let fixture: ComponentFixture<CompanyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
