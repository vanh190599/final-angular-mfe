import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExampleComponent } from './main-example.component';

describe('MainExampleComponent', () => {
  let component: MainExampleComponent;
  let fixture: ComponentFixture<MainExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
