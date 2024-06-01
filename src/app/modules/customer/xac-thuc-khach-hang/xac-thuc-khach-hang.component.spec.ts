import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacThucKhachHangComponent } from './xac-thuc-khach-hang.component';

describe('XacThucKhachHangComponent', () => {
  let component: XacThucKhachHangComponent;
  let fixture: ComponentFixture<XacThucKhachHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XacThucKhachHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XacThucKhachHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
