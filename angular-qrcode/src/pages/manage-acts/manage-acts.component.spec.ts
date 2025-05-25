import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActsComponent } from './manage-acts.component';

describe('ManageActsComponent', () => {
  let component: ManageActsComponent;
  let fixture: ComponentFixture<ManageActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageActsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
