import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySlideComponent } from './gallery-slide.component';

describe('GallerySlideComponent', () => {
  let component: GallerySlideComponent;
  let fixture: ComponentFixture<GallerySlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
