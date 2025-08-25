import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutcompComponent } from './layoutcomp.component';

describe('LayoutcompComponent', () => {
  let component: LayoutcompComponent;
  let fixture: ComponentFixture<LayoutcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutcompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
