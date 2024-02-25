import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacerOrderComponent } from './placer-order.component';

describe('PlacerOrderComponent', () => {
  let component: PlacerOrderComponent;
  let fixture: ComponentFixture<PlacerOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacerOrderComponent]
    });
    fixture = TestBed.createComponent(PlacerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
