import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDataComponent } from './create-new-data.component';

describe('CreateNewDataComponent', () => {
  let component: CreateNewDataComponent;
  let fixture: ComponentFixture<CreateNewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
