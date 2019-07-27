import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWebCamComponent } from './open-web-cam.component';

describe('OpenWebCamComponent', () => {
  let component: OpenWebCamComponent;
  let fixture: ComponentFixture<OpenWebCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenWebCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWebCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
